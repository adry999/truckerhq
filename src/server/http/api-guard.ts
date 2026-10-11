import "server-only";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/shared/config/site";
import { serverEnv } from "@/server/env";

const MAX_BODY_BYTES = 16_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_TRACKED_KEYS = 1000;

let allowedOrigins: Set<string> | undefined;

function getAllowedOrigins(): Set<string> {
  if (!allowedOrigins) {
    const { VERCEL_URL, VERCEL_BRANCH_URL } = serverEnv();
    allowedOrigins = new Set([
      "https://truckerhq.com",
      "https://www.truckerhq.com",
      SITE_URL,
      // This deployment's own URLs, so forms also work on preview deployments.
      ...[VERCEL_URL, VERCEL_BRANCH_URL].filter(Boolean).map((h) => `https://${h}`),
    ]);
  }
  return allowedOrigins;
}

// In-memory sliding window. Resets per cold start and is per-instance, so it
// is a speed bump against casual abuse, not a hard guarantee under Fluid
// Compute's multi-instance scaling. Good enough for a lead-gen form; swap
// for a shared store (Upstash, Vercel KV-alike) if abuse gets serious.
const hits = new Map<string, number[]>();

export function resetRateLimitForTests(): void {
  hits.clear();
}

export function rateLimitSizeForTests(): number {
  return hits.size;
}

function sweepExpired(now: number): void {
  for (const [key, timestamps] of hits) {
    if (now - timestamps[timestamps.length - 1]! >= WINDOW_MS) hits.delete(key);
  }
}

export function getClientIp(req: Request): string {
  // Vercel sets the first two itself and they can't be spoofed through its edge;
  // a client-supplied x-forwarded-for entry can.
  const vercel = req.headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return "unknown";
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  if (hits.size > MAX_TRACKED_KEYS) sweepExpired(now);
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients (curl, server-to-server) send no Origin
  return getAllowedOrigins().has(origin);
}

export function rejectResponse(status: number, error: string) {
  return NextResponse.json({ error }, { status });
}

export type JsonBodyResult = { ok: true; body: unknown } | { ok: false; status: 400 | 413 };

/** Reads the body as JSON, enforcing the size cap on bytes actually received, not the header. */
export async function readJsonBody(
  req: Request,
  maxBytes = MAX_BODY_BYTES,
): Promise<JsonBodyResult> {
  const declared = Number(req.headers.get("content-length"));
  if (declared > maxBytes) return { ok: false, status: 413 };

  const chunks: Uint8Array[] = [];
  let total = 0;
  if (req.body) {
    const reader = req.body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel().catch(() => {});
        return { ok: false, status: 413 };
      }
      chunks.push(value);
    }
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { ok: true, body: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { ok: false, status: 400 };
  }
}

/**
 * Runs the shared abuse checks (origin, rate limit) for a POST lead-form
 * route. Returns a Response to short-circuit with, or null to continue.
 */
export function guardLeadRoute(req: Request): Response | null {
  if (!isAllowedOrigin(req)) return rejectResponse(403, "Forbidden");
  const ip = getClientIp(req);
  if (isRateLimited(`${new URL(req.url).pathname}:${ip}`)) {
    return rejectResponse(429, "Too many requests, try again in a minute");
  }
  return null;
}

/** True if `value` is a non-empty honeypot field a bot filled in. */
export function isHoneypotTripped(body: Record<string, unknown> | null): boolean {
  const v = body?.["website"];
  return typeof v === "string" && v.trim().length > 0;
}
