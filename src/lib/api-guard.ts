import "server-only";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

const ALLOWED_ORIGINS = new Set([
  "https://truckerhq.com",
  "https://www.truckerhq.com",
  SITE_URL,
  // This deployment's own URLs, so forms also work on preview deployments.
  ...[process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]
    .filter(Boolean)
    .map((h) => `https://${h}`),
]);

const MAX_BODY_BYTES = 16_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory sliding window. Resets per cold start and is per-instance, so it
// is a speed bump against casual abuse, not a hard guarantee under Fluid
// Compute's multi-instance scaling. Good enough for a lead-gen form; swap
// for a shared store (Upstash, Vercel KV-alike) if abuse gets serious.
const hits = new Map<string, number[]>();

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients (curl, server-to-server) send no Origin
  return ALLOWED_ORIGINS.has(origin);
}

export function isTooLarge(req: Request): boolean {
  const len = req.headers.get("content-length");
  return len != null && Number(len) > MAX_BODY_BYTES;
}

export function rejectResponse(status: number, error: string) {
  return NextResponse.json({ error }, { status });
}

/**
 * Runs the shared abuse checks (origin, body size, rate limit) for a POST
 * lead-form route. Returns a Response to short-circuit with, or null to
 * continue handling the request.
 */
export function guardLeadRoute(req: Request): Response | null {
  if (!isAllowedOrigin(req)) return rejectResponse(403, "Forbidden");
  if (isTooLarge(req)) return rejectResponse(413, "Payload too large");
  const ip = getClientIp(req);
  if (isRateLimited(`${new URL(req.url).pathname}:${ip}`)) {
    return rejectResponse(429, "Too many requests, try again in a minute");
  }
  return null;
}

/** Trims a string field and caps its length; returns "" if not a string. */
export function str(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

/** True if `value` is a non-empty honeypot field a bot filled in. */
export function isHoneypotTripped(body: Record<string, unknown> | null): boolean {
  const v = body?.["website"];
  return typeof v === "string" && v.trim().length > 0;
}
