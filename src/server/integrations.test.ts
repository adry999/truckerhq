import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { resetServerEnvForTests } from "@/server/env";
import { describeIntegrations, integrationStatus } from "@/server/integrations";

const VARS = [
  "SUPABASE_URL", "SUPABASE_SECRET_KEY", "TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_FROM",
  "RESEND_API_KEY", "LEADS_NOTIFY_TO", "TURNSTILE_SECRET_KEY", "FMCSA_WEBKEY", "CF_ORIGIN_SECRET",
];

beforeEach(() => {
  for (const v of VARS) vi.stubEnv(v, "");
  resetServerEnvForTests();
});
afterEach(() => {
  vi.unstubAllEnvs();
  resetServerEnvForTests();
});

describe("integrationStatus", () => {
  it("reports everything missing when nothing is set", () => {
    expect(Object.values(integrationStatus()).some(Boolean)).toBe(false);
  });

  it("needs both Supabase URL and secret key", () => {
    vi.stubEnv("SUPABASE_URL", "https://x.supabase.co");
    expect(integrationStatus().supabase).toBe(false);
    vi.stubEnv("SUPABASE_SECRET_KEY", "sb_secret_x");
    resetServerEnvForTests();
    expect(integrationStatus().supabase).toBe(true);
  });

  it("needs the API key and recipient for email, all three Twilio values for SMS", () => {
    vi.stubEnv("RESEND_API_KEY", "k");
    vi.stubEnv("TWILIO_ACCOUNT_SID", "s");
    resetServerEnvForTests();
    expect(integrationStatus().email).toBe(false);
    expect(integrationStatus().sms).toBe(false);
    vi.stubEnv("LEADS_NOTIFY_TO", "a@b.co");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "t");
    vi.stubEnv("TWILIO_FROM", "+13125550100");
    resetServerEnvForTests();
    expect(integrationStatus().email).toBe(true);
    expect(integrationStatus().sms).toBe(true);
  });
});

describe("describeIntegrations", () => {
  it("lists missing required integrations without any secret values", () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "super-secret-value");
    resetServerEnvForTests();
    const { line, missingRequired } = describeIntegrations(integrationStatus());
    expect(missingRequired).toEqual(["supabase", "cf-origin-secret"]);
    expect(line).toContain("configured: turnstile");
    expect(line).not.toContain("super-secret-value");
  });
});
