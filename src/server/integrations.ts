import "server-only";
import { serverEnv } from "@/server/env";

export type Integrations = {
  supabase: boolean;
  sms: boolean;
  email: boolean;
  turnstile: boolean;
  fmcsa: boolean;
  originSecret: boolean;
};

/** Which integrations have their configuration present. Booleans only, never values. */
export function integrationStatus(): Integrations {
  const env = serverEnv();
  return {
    supabase: Boolean(env.SUPABASE_URL && env.SUPABASE_SECRET_KEY),
    sms: Boolean(env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_FROM),
    email: Boolean(env.RESEND_API_KEY && env.LEADS_NOTIFY_TO),
    turnstile: Boolean(env.TURNSTILE_SECRET_KEY),
    fmcsa: Boolean(env.FMCSA_WEBKEY),
    originSecret: Boolean(env.CF_ORIGIN_SECRET),
  };
}

const LABELS: Record<keyof Integrations, string> = {
  supabase: "supabase",
  sms: "twilio-sms",
  email: "resend-email",
  turnstile: "turnstile",
  fmcsa: "fmcsa",
  originSecret: "cf-origin-secret",
};

const REQUIRED_IN_PRODUCTION: (keyof Integrations)[] = ["supabase", "turnstile", "originSecret"];

/** One-line summary plus the required integrations that are missing. */
export function describeIntegrations(status: Integrations): { line: string; missingRequired: string[] } {
  const keys = Object.keys(LABELS) as (keyof Integrations)[];
  const on = keys.filter((k) => status[k]).map((k) => LABELS[k]);
  const off = keys.filter((k) => !status[k]).map((k) => LABELS[k]);
  return {
    line: `[startup] configured: ${on.join(", ") || "none"}; missing: ${off.join(", ") || "none"}`,
    missingRequired: REQUIRED_IN_PRODUCTION.filter((k) => !status[k]).map((k) => LABELS[k]),
  };
}
