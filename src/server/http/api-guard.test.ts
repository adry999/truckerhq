import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  isHoneypotTripped,
  isAllowedOrigin,
  getClientIp,
  isRateLimited,
  readJsonBody,
  guardLeadRoute,
  resetRateLimitForTests,
  rateLimitSizeForTests,
} from "./api-guard";

const URL_ = "https://truckerhq.com/api/contact";

beforeEach(() => resetRateLimitForTests());

describe("isHoneypotTripped", () => {
  it("is true only when website is a non-empty string", () => {
    expect(isHoneypotTripped({ website: "spam" })).toBe(true);
    expect(isHoneypotTripped({ website: "  spam  " })).toBe(true);
  });

  it("is false when website is empty, whitespace, missing, or not a string", () => {
    expect(isHoneypotTripped({ website: "" })).toBe(false);
    expect(isHoneypotTripped({ website: "   " })).toBe(false);
    expect(isHoneypotTripped({})).toBe(false);
    expect(isHoneypotTripped(null)).toBe(false);
    expect(isHoneypotTripped({ website: 123 })).toBe(false);
  });
});

describe("isAllowedOrigin", () => {
  it("allows requests with no Origin header (non-browser clients)", () => {
    expect(isAllowedOrigin(new Request(URL_, { method: "POST" }))).toBe(true);
  });

  it("allows the site's own origins", () => {
    const req = new Request(URL_, { method: "POST", headers: { origin: "https://truckerhq.com" } });
    expect(isAllowedOrigin(req)).toBe(true);
  });

  it("rejects a cross-site Origin", () => {
    const req = new Request(URL_, {
      method: "POST",
      headers: { origin: "https://evil.example.com" },
    });
    expect(isAllowedOrigin(req)).toBe(false);
  });
});

describe("readJsonBody", () => {
  const post = (body: BodyInit | null, headers: Record<string, string> = {}) =>
    new Request(URL_, { method: "POST", body, headers });

  it("parses a valid JSON body", async () => {
    expect(await readJsonBody(post('{"a":1}'))).toEqual({ ok: true, body: { a: 1 } });
  });

  it("returns non-object JSON as-is", async () => {
    expect(await readJsonBody(post("[1]"))).toEqual({ ok: true, body: [1] });
    expect(await readJsonBody(post("null"))).toEqual({ ok: true, body: null });
    expect(await readJsonBody(post('"s"'))).toEqual({ ok: true, body: "s" });
  });

  it("returns 400 for invalid or empty JSON", async () => {
    expect(await readJsonBody(post("{not json"))).toEqual({ ok: false, status: 400 });
    expect(await readJsonBody(post(null))).toEqual({ ok: false, status: 400 });
  });

  it("returns 413 when content-length exceeds the cap", async () => {
    const res = await readJsonBody(post('{"a":1}', { "content-length": "20000" }));
    expect(res).toEqual({ ok: false, status: 413 });
  });

  it("returns 413 when the streamed size exceeds the cap with no content-length", async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        const chunk = new TextEncoder().encode("x".repeat(600));
        for (let i = 0; i < 30; i++) controller.enqueue(chunk);
        controller.close();
      },
    });
    const req = new Request(URL_, { method: "POST", body: stream, duplex: "half" } as RequestInit);
    expect(req.headers.get("content-length")).toBeNull();
    expect(await readJsonBody(req)).toEqual({ ok: false, status: 413 });
  });

  it("honours a custom cap", async () => {
    expect(await readJsonBody(post('{"a":"bbbbbbbbbb"}'), 5)).toEqual({ ok: false, status: 413 });
  });
});

describe("getClientIp", () => {
  const req = (headers: Record<string, string>) => new Request(URL_, { headers });

  it("prefers x-vercel-forwarded-for, then x-real-ip, then x-forwarded-for", () => {
    const all = {
      "x-vercel-forwarded-for": "1.1.1.1",
      "x-real-ip": "2.2.2.2",
      "x-forwarded-for": "3.3.3.3, 4.4.4.4",
    };
    expect(getClientIp(req(all))).toBe("1.1.1.1");
    expect(getClientIp(req({ "x-real-ip": "2.2.2.2", "x-forwarded-for": "3.3.3.3" }))).toBe(
      "2.2.2.2",
    );
    expect(getClientIp(req({ "x-forwarded-for": "3.3.3.3, 4.4.4.4" }))).toBe("3.3.3.3");
  });

  it("falls back to 'unknown'", () => {
    expect(getClientIp(req({}))).toBe("unknown");
  });
});

describe("isRateLimited", () => {
  afterEach(() => vi.useRealTimers());

  it("allows the first few requests then blocks the rest within the window", () => {
    const results = Array.from({ length: 8 }, () => isRateLimited("k"));
    expect(results.slice(0, 5)).toEqual([false, false, false, false, false]);
    expect(results.slice(5)).toEqual([true, true, true]);
  });

  it("tracks distinct keys independently", () => {
    expect(isRateLimited("a")).toBe(false);
    expect(isRateLimited("b")).toBe(false);
  });

  it("allows requests again once the window has passed", () => {
    vi.useFakeTimers();
    for (let i = 0; i < 6; i++) isRateLimited("k");
    expect(isRateLimited("k")).toBe(true);
    vi.advanceTimersByTime(60_001);
    expect(isRateLimited("k")).toBe(false);
  });

  it("evicts expired keys so memory stays bounded", () => {
    vi.useFakeTimers();
    for (let i = 0; i < 1500; i++) isRateLimited(`old-${i}`);
    expect(rateLimitSizeForTests()).toBe(1500);
    vi.advanceTimersByTime(60_001);
    isRateLimited("fresh");
    expect(rateLimitSizeForTests()).toBe(1);
  });
});

describe("guardLeadRoute", () => {
  const req = (headers: Record<string, string> = {}) =>
    new Request(URL_, { method: "POST", headers: { "x-real-ip": "7.7.7.7", ...headers } });

  it("returns null for an allowed, unthrottled request", () => {
    expect(guardLeadRoute(req())).toBeNull();
  });

  it("returns 403 for a foreign origin", async () => {
    const res = guardLeadRoute(req({ origin: "https://evil.example.com" }))!;
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: "Forbidden" });
  });

  it("returns 429 once the rate limit is exceeded", async () => {
    for (let i = 0; i < 5; i++) expect(guardLeadRoute(req())).toBeNull();
    const res = guardLeadRoute(req())!;
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ error: "Too many requests, try again in a minute" });
  });
});
