import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { resetServerEnvForTests } from "@/server/env";
import { GET } from "./route";

beforeEach(() => {
  vi.stubEnv("SUPABASE_URL", "https://x.supabase.co");
  vi.stubEnv("SUPABASE_SECRET_KEY", "sb_secret_hidden");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "");
  vi.stubEnv("FMCSA_WEBKEY", "");
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("TWILIO_ACCOUNT_SID", "");
  resetServerEnvForTests();
});
afterEach(() => {
  vi.unstubAllEnvs();
  resetServerEnvForTests();
});

describe("GET /api/health", () => {
  it("reports only whether leads can be saved, uncached, without secrets", async () => {
    const res = GET();
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const text = await res.text();
    expect(JSON.parse(text)).toEqual({ ok: true, leads: true });
    expect(text).not.toContain("turnstile");
    expect(text).not.toContain("hidden");
  });
});
