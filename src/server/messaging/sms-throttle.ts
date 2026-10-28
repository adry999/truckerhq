import "server-only";
import { supabaseRest } from "@/server/db/supabase-rest";
import { httpRequest } from "@/server/http/http-request";

const PER_PHONE_MS = 10 * 60_000;
const GLOBAL_WINDOW_MS = 60 * 60_000;
const GLOBAL_MAX = 30;

// In-memory fallback: a per-instance speed bump used when Supabase is not
// configured or unreachable. It resets on restart.
const lastSent = new Map<string, number>();
let sends: number[] = [];
let warnedFallback = false;

export function claimSmsSlotInMemory(phoneE164: string, now = Date.now()): boolean {
  for (const [phone, t] of lastSent) {
    if (now - t >= PER_PHONE_MS) lastSent.delete(phone);
  }
  sends = sends.filter((t) => now - t < GLOBAL_WINDOW_MS);

  if (lastSent.has(phoneE164) || sends.length >= GLOBAL_MAX) return false;
  lastSent.set(phoneE164, now);
  sends.push(now);
  return true;
}

function fallback(phoneE164: string, now: number): boolean {
  if (!warnedFallback) {
    warnedFallback = true;
    console.warn("[sms-throttle] Supabase unavailable; using in-memory throttle");
  }
  return claimSmsSlotInMemory(phoneE164, now);
}

async function selectIds(
  baseUrl: string,
  headers: Record<string, string>,
  params: Record<string, string>,
): Promise<number | null> {
  const query = new URLSearchParams({ select: "id", ...params });
  const result = await httpRequest("supabase", `${baseUrl}/sms_sends?${query}`, {
    method: "GET",
    headers,
  });
  if (!result.ok) return null;
  try {
    const rows: unknown = JSON.parse(result.text);
    return Array.isArray(rows) ? rows.length : null;
  } catch {
    return null;
  }
}

/**
 * True when an SMS to this phone may go out now, and records it. Durable via the
 * Supabase `sms_sends` table; falls back to an in-memory throttle when Supabase is
 * not configured or a call fails. The check-then-insert is not atomic, so a burst of
 * concurrent requests can slightly overshoot the limits; acceptable for abuse control.
 */
export async function claimSmsSlot(phoneE164: string, now = Date.now()): Promise<boolean> {
  const rest = supabaseRest();
  if (!rest) return fallback(phoneE164, now);

  const phoneSince = new Date(now - PER_PHONE_MS).toISOString();
  const globalSince = new Date(now - GLOBAL_WINDOW_MS).toISOString();
  const [recentToPhone, recentGlobal] = await Promise.all([
    selectIds(rest.baseUrl, rest.headers, {
      phone: `eq.${phoneE164}`,
      sent_at: `gte.${phoneSince}`,
      limit: "1",
    }),
    selectIds(rest.baseUrl, rest.headers, { sent_at: `gte.${globalSince}`, limit: String(GLOBAL_MAX) }),
  ]);
  if (recentToPhone === null || recentGlobal === null) return fallback(phoneE164, now);
  if (recentToPhone > 0 || recentGlobal >= GLOBAL_MAX) return false;

  const inserted = await httpRequest("supabase", `${rest.baseUrl}/sms_sends`, {
    method: "POST",
    headers: { ...rest.headers, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ phone: phoneE164 }),
  });
  if (!inserted.ok) return fallback(phoneE164, now);
  return true;
}

export function resetSmsThrottle(): void {
  lastSent.clear();
  sends = [];
  warnedFallback = false;
}
