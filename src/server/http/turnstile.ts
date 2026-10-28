import "server-only";
import { SITE_HOST } from "@/shared/config/site";
import { serverEnv } from "@/server/env";
import { httpRequest } from "@/server/http/http-request";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_TOKEN_LENGTH = 2048; // documented Turnstile token cap
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

let warnedUnset = false;

export function resetTurnstileWarningForTests(): void {
  warnedUnset = false;
}

/**
 * Verifies a Turnstile token server-side. With no TURNSTILE_SECRET_KEY the check is
 * skipped (dev / staging) and that is logged once. A token works only once and lives 5 min.
 */
export async function verifyTurnstile(token: unknown, ip: string | null): Promise<boolean> {
  const { TURNSTILE_SECRET_KEY } = serverEnv();
  if (!TURNSTILE_SECRET_KEY) {
    if (!warnedUnset) {
      warnedUnset = true;
      console.warn("[turnstile] TURNSTILE_SECRET_KEY not set; bot check skipped");
    }
    return true;
  }
  if (typeof token !== "string" || token.length === 0 || token.length > MAX_TOKEN_LENGTH) {
    return false;
  }

  const form = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
  if (ip && ip !== "unknown") form.set("remoteip", ip);
  const result = await httpRequest("turnstile", SITEVERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
    timeoutMs: 5000,
  });
  if (!result.ok) return false;

  let data: { success?: boolean; hostname?: string };
  try {
    data = JSON.parse(result.text);
  } catch {
    return false;
  }
  if (data.success !== true) return false;
  const host = data.hostname ?? "";
  return LOCAL_HOSTS.has(host) || host === SITE_HOST || host === `www.${SITE_HOST}`;
}
