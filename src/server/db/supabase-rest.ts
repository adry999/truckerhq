import "server-only";
import { serverEnv } from "@/server/env";

let warnedAnonFallback = false;

/**
 * Base URL and auth headers for Supabase PostgREST, or null when not configured.
 * The secret key (service_role, bypasses RLS) is preferred; the anon key is a legacy fallback.
 */
export function supabaseRest(): { baseUrl: string; headers: Record<string, string> } | null {
  const { SUPABASE_URL, SUPABASE_SECRET_KEY, SUPABASE_ANON_KEY } = serverEnv();
  const key = SUPABASE_SECRET_KEY ?? SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !key) return null;
  if (!SUPABASE_SECRET_KEY && !warnedAnonFallback) {
    warnedAnonFallback = true;
    console.warn("[supabase] SUPABASE_SECRET_KEY not set; falling back to SUPABASE_ANON_KEY");
  }
  // sb_secret_ keys are not JWTs and go on `apikey` only; legacy JWT keys also need Bearer.
  const headers: Record<string, string> = { apikey: key };
  if (!key.startsWith("sb_")) headers.Authorization = `Bearer ${key}`;
  return { baseUrl: `${SUPABASE_URL}/rest/v1`, headers };
}
