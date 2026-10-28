import "server-only";
import { supabaseRest } from "@/server/db/supabase-rest";
import { httpRequest } from "@/server/http/http-request";

// These mirror the Supabase schema; generate them (`supabase gen types`) once project access is set up.
type SmsConsentEvidence = {
  sms_consent: boolean;
  sms_consent_version: string | null;
  sms_consent_at: string | null;
  consent_ip: string | null;
  consent_user_agent: string | null;
};

export type LeadTables = {
  job_applications: {
    job_slug: string;
    full_name: string;
    phone: string;
    cdl_class: string;
    experience: string;
    language: string;
  } & Partial<SmsConsentEvidence>;
  claims: {
    dot: string;
    carrier_slug: string;
    contact_method: string;
    phone: string;
    equipment: string[];
    lanes: string[];
    also_show: string[];
  };
  compliance_alert_signups: {
    dot: string;
    phone: string;
    language: string;
    watch: Record<string, boolean>;
  } & Partial<SmsConsentEvidence>;
  contact_messages: {
    topic: string;
    name: string;
    phone: string;
    message: string;
    language: string;
  };
  dispatch_requests: {
    trailer_type: string;
    trucks: number;
    driver_type: string;
    home_base: string;
    lanes: string[];
    home_time: string;
    authority: string;
    mc_number: string;
    name: string;
    phone: string;
    best_time: string;
    language: string;
  } & Partial<SmsConsentEvidence>;
  hire_driver_requests: {
    company_name: string;
    dot_number: string;
    contact_name: string;
    phone: string;
    pay: string;
    home_base: string;
    position: string;
    equipment: string;
    driver_language: string;
  };
};

/**
 * Server-only insert into a Supabase table via PostgREST. The tables have RLS enabled
 * with no anon/authenticated policies (supabase/migrations), so only the secret key
 * (service_role, bypasses RLS) can write. The anon key is a legacy fallback and
 * fails once RLS is locked down.
 */
export async function insertRow<T extends keyof LeadTables>(
  table: T,
  row: LeadTables[T],
): Promise<boolean> {
  const rest = supabaseRest();
  if (!rest) {
    console.error("[supabase] SUPABASE_URL and SUPABASE_SECRET_KEY not set; lead not saved");
    return false;
  }

  const result = await httpRequest("supabase", `${rest.baseUrl}/${table}`, {
    method: "POST",
    headers: { ...rest.headers, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(row),
  });
  return result.ok;
}
