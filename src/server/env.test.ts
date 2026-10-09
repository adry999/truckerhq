import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { serverEnv, resetServerEnvForTests } from "./env";

beforeEach(() => resetServerEnvForTests());
afterEach(() => {
  vi.unstubAllEnvs();
  resetServerEnvForTests();
});

describe("serverEnv", () => {
  it("does not throw at import even when the environment is invalid", async () => {
    vi.stubEnv("SUPABASE_URL", "not a url");
    vi.resetModules();
    await expect(import("./env")).resolves.toBeDefined();
  });

  it("reads values from process.env and caches the result", () => {
    vi.stubEnv("TWILIO_FROM", "+15550001111");
    const first = serverEnv();
    expect(first.TWILIO_FROM).toBe("+15550001111");
    vi.stubEnv("TWILIO_FROM", "+15559998888");
    expect(serverEnv()).toBe(first);
    expect(serverEnv().TWILIO_FROM).toBe("+15550001111");
  });

  it("returns a frozen object", () => {
    expect(Object.isFrozen(serverEnv())).toBe(true);
  });

  it("treats empty strings as unset", () => {
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("RESEND_API_KEY", "");
    const env = serverEnv();
    expect(env.SUPABASE_URL).toBeUndefined();
    expect(env.RESEND_API_KEY).toBeUndefined();
  });

  it("logs an invalid variable by name, not value, and treats it as unset", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("SUPABASE_URL", "super-secret-not-a-url");
    vi.stubEnv("TWILIO_FROM", "+15550001111");
    const env = serverEnv();
    expect(env.SUPABASE_URL).toBeUndefined();
    expect(env.TWILIO_FROM).toBe("+15550001111");
    const logged = error.mock.calls.flat().join(" ");
    expect(logged).toContain("SUPABASE_URL");
    expect(logged).not.toContain("super-secret-not-a-url");
    error.mockRestore();
  });

  it("defaults RESEND_FROM", () => {
    vi.stubEnv("RESEND_FROM", "");
    expect(serverEnv().RESEND_FROM).toBe("Trucker HQ <hello@truckerhq.com>");
    resetServerEnvForTests();
    vi.stubEnv("RESEND_FROM", "Me <me@example.com>");
    expect(serverEnv().RESEND_FROM).toBe("Me <me@example.com>");
  });
});
