import "server-only";
import { serverEnv } from "@/server/env";
import { httpRequest } from "@/server/http/http-request";

// These mirror the Supabase schema; generate them (`supabase gen types`) once project access is set up.
export type LeadTables = {
  job_applications: {
    job_slug: string;
    full_name: string;
    phone: string;
    cdl_class: string;
    experience: string;
    language: string;
  };
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
  };
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
  };
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
 * Server-only insert into a Supabase table via PostgREST. Each table only
 * has an "insert" RLS policy for anon/authenticated — this can write leads
 * but can never read them back, by design.
 */
export async function insertRow<T extends keyof LeadTables>(
  table: T,
  row: LeadTables[T],
): Promise<boolean> {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = serverEnv();
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("[supabase] SUPABASE_URL/SUPABASE_ANON_KEY not set; lead not saved");
    return false;
  }

  const result = await httpRequest("supabase", `${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
  return result.ok;
}
