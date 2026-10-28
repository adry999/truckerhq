import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { resetServerEnvForTests } from "@/server/env";
import { resetTurnstileWarningForTests, verifyTurnstile } from "./turnstile";

const fetchMock = vi.fn();
let warnSpy: ReturnType<typeof vi.spyOn>;

const respond = (body: object, status = 200) =>
  fetchMock.mockResolvedValue(new Response(JSON.stringify(body), { status }));

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  resetServerEnvForTests();
  resetTurnstileWarningForTests();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  resetServerEnvForTests();
});

describe("verifyTurnstile", () => {
  it("skips the check and warns once when no secret is configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    expect(await verifyTurnstile(undefined, "1.2.3.4")).toBe(true);
    expect(await verifyTurnstile("x", "1.2.3.4")).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  describe("with a secret", () => {
    beforeEach(() => vi.stubEnv("TURNSTILE_SECRET_KEY", "s3cret"));

    it("posts the form-encoded secret, token and ip and accepts a success", async () => {
      respond({ success: true, hostname: "localhost" });
      expect(await verifyTurnstile("tok", "1.2.3.4")).toBe(true);
      const [url, init] = fetchMock.mock.calls[0]! as [string, RequestInit];
      expect(url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
      expect(init.method).toBe("POST");
      const form = init.body as URLSearchParams;
      expect(form.get("secret")).toBe("s3cret");
      expect(form.get("response")).toBe("tok");
      expect(form.get("remoteip")).toBe("1.2.3.4");
    });

    it("rejects when Cloudflare says success is false", async () => {
      respond({ success: false, "error-codes": ["timeout-or-duplicate"] });
      expect(await verifyTurnstile("tok", null)).toBe(false);
    });

    it("rejects a token served on another hostname", async () => {
      respond({ success: true, hostname: "evil.example.com" });
      expect(await verifyTurnstile("tok", null)).toBe(false);
    });

    it.each([undefined, "", 42, "x".repeat(2049)])("rejects a bad token %#", async (token) => {
      expect(await verifyTurnstile(token, null)).toBe(false);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("rejects when the siteverify call fails or returns junk", async () => {
      respond({}, 500);
      expect(await verifyTurnstile("tok", null)).toBe(false);
      fetchMock.mockResolvedValue(new Response("not json", { status: 200 }));
      expect(await verifyTurnstile("tok", null)).toBe(false);
    });
  });
});
