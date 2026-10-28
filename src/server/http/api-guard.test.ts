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
import { SITE_URL } from "@/shared/config/site";
import { resetServerEnvForTests } from "@/server/env";

const URL_ = "http://localhost:3000/api/contact";
const OWN_ORIGIN = "http://localhost:3000";

beforeEach(() => {
  resetRateLimitForTests();
  resetServerEnvForTests();
});
afterEach(() => {
  vi.unstubAllEnvs();
  resetServerEnvForTests();
});

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
  const post = (origin?: string) =>
    new Request(URL_, { method: "POST", headers: origin ? { origin } : {} });

  it("rejects requests with no Origin header", () => {
    expect(isAllowedOrigin(post())).toBe(false);
  });

  it("allows the site's own origin", () => {
    expect(isAllowedOrigin(post(OWN_ORIGIN))).toBe(true);
  });

  it("rejects a cross-site Origin", () => {
    expect(isAllowedOrigin(post("https://evil.example.com"))).toBe(false);
  });

  it("allows origins listed in ALLOWED_ORIGINS, ignoring spaces and trailing slashes", () => {
    vi.stubEnv(
      "ALLOWED_ORIGINS",
      "https://a.example.com/, https://www.a.example.com",
    );
    expect(isAllowedOrigin(post("https://a.example.com"))).toBe(true);
    expect(isAllowedOrigin(post("https://www.a.example.com"))).toBe(true);
    expect(isAllowedOrigin(post("https://b.example.com"))).toBe(false);
  });

  it("allows localhost only outside production", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(isAllowedOrigin(post("http://localhost:3000"))).toBe(
      new URL(SITE_URL).origin === "http://localhost:3000",
    );
    vi.stubEnv("NODE_ENV", "development");
    expect(isAllowedOrigin(post("http://localhost:3000"))).toBe(true);
  });
});

describe("readJsonBody", () => {
  const post = (body: BodyInit | null, headers: Record<string, string> = {}) =>
    new Request(URL_, { method: "POST", body, headers });

  it("parses a valid JSON body", async () => {
    expect(await readJsonBody(post('{"a":1}'))).toEqual({
      ok: true,
      body: { a: 1 },
    });
  });

  it("returns non-object JSON as-is", async () => {
    expect(await readJsonBody(post("[1]"))).toEqual({ ok: true, body: [1] });
    expect(await readJsonBody(post("null"))).toEqual({ ok: true, body: null });
    expect(await readJsonBody(post('"s"'))).toEqual({ ok: true, body: "s" });
  });

  it("returns 400 for invalid or empty JSON", async () => {
    expect(await readJsonBody(post("{not json"))).toEqual({
      ok: false,
      status: 400,
    });
    expect(await readJsonBody(post(null))).toEqual({ ok: false, status: 400 });
  });

  it("returns 413 when content-length exceeds the cap", async () => {
    const res = await readJsonBody(
      post('{"a":1}', { "content-length": "20000" }),
    );
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
    const req = new Request(URL_, {
      method: "POST",
      body: stream,
      duplex: "half",
    } as RequestInit);
    expect(req.headers.get("content-length")).toBeNull();
    expect(await readJsonBody(req)).toEqual({ ok: false, status: 413 });
  });

  it("honours a custom cap", async () => {
    expect(await readJsonBody(post('{"a":"bbbbbbbbbb"}'), 5)).toEqual({
      ok: false,
      status: 413,
    });
  });
});

describe("getClientIp", () => {
  const req = (headers: Record<string, string>) =>
    new Request(URL_, { headers });

  it("uses cf-connecting-ip", () => {
    expect(getClientIp(req({ "cf-connecting-ip": "1.1.1.1" }))).toBe("1.1.1.1");
  });

  it("ignores client-controllable forwarding headers", () => {
    const spoofed = {
      "x-vercel-forwarded-for": "1.1.1.1",
      "x-real-ip": "2.2.2.2",
      "x-forwarded-for": "3.3.3.3, 4.4.4.4",
    };
    expect(getClientIp(req(spoofed))).toBe("unknown");
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
    new Request(URL_, {
      method: "POST",
      headers: {
        origin: OWN_ORIGIN,
        "cf-connecting-ip": "7.7.7.7",
        ...headers,
      },
    });

  it("returns null for an allowed, unthrottled request", () => {
    expect(guardLeadRoute(req())).toBeNull();
  });

  it("returns 403 for a foreign origin", async () => {
    const res = guardLeadRoute(req({ origin: "https://evil.example.com" }))!;
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: "Forbidden" });
  });

  it("returns 403 when Origin is missing", () => {
    const res = guardLeadRoute(
      new Request(URL_, {
        method: "POST",
        headers: { "cf-connecting-ip": "7.7.7.7" },
      }),
    )!;
    expect(res.status).toBe(403);
  });

  it("returns 429 once the rate limit is exceeded", async () => {
    for (let i = 0; i < 5; i++) expect(guardLeadRoute(req())).toBeNull();
    const res = guardLeadRoute(req())!;
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({
      error: "Too many requests, try again in a minute",
    });
  });

  describe("with CF_ORIGIN_SECRET set", () => {
    beforeEach(() => vi.stubEnv("CF_ORIGIN_SECRET", "s3cret-value"));

    it("accepts a matching x-origin-secret", () => {
      expect(
        guardLeadRoute(req({ "x-origin-secret": "s3cret-value" })),
      ).toBeNull();
    });

    it.each([undefined, "wrong", "s3cret-valuX", "s3cret-value-longer"])(
      "returns 403 for x-origin-secret %j",
      (value) => {
        const res = guardLeadRoute(
          req(value === undefined ? {} : { "x-origin-secret": value }),
        )!;
        expect(res.status).toBe(403);
      },
    );
  });

  it("does not require the secret header when CF_ORIGIN_SECRET is unset", () => {
    expect(guardLeadRoute(req())).toBeNull();
  });
});
