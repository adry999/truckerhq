import "server-only";
import type { Carrier, CarrierStatus } from "@/lib/data";
import { serverEnv } from "@/server/env";
import { httpRequest } from "@/server/http/http-request";

// FMCSA QCMobile API. Needs FMCSA_WEBKEY (free, from
// https://mobile.fmcsa.dot.gov/QCDevsite/docs/apiAccess). FMCSA publishes no
// response schema, so every field read in toCarrier() is optional.

const BASE_URL = "https://mobile.fmcsa.dot.gov/qc/services/carriers";

export function fmcsaEnabled(): boolean {
  return !!serverEnv().FMCSA_WEBKEY;
}

type RawFmcsaCarrier = {
  dotNumber?: number | string;
  legalName?: string;
  dbaName?: string;
  phyCity?: string;
  phyState?: string;
  statusCode?: string; // "A" active, "I" inactive
  allowedToOperate?: string; // "Y" / "N"
  bipdInsuranceOnFile?: string; // "Y" / "N"
  cargoInsuranceOnFile?: string; // "Y" / "N"
  safetyRating?: string; // "S" satisfactory, "C" conditional, "U" unsatisfactory, ""
  totalDrivers?: number | string;
  totalPowerUnits?: number | string;
  driverOosRate?: number | string;
  vehicleOosRate?: number | string;
  crashTotal?: number | string;
  mcNumber?: string;
  docketNumber?: string;
};

type FmcsaEnvelope =
  | { content?: { carrier?: RawFmcsaCarrier } }
  | { content?: { carrier?: RawFmcsaCarrier }[] };

async function fmcsaFetch(path: string): Promise<FmcsaEnvelope | null> {
  const webKey = serverEnv().FMCSA_WEBKEY;
  if (!webKey) return null;

  const url = `${BASE_URL}${path}${path.includes("?") ? "&" : "?"}webKey=${encodeURIComponent(webKey)}`;

  const res = await httpRequest("fmcsa", url, {
    // FMCSA data doesn't change minute to minute; cache each unique
    // lookup for an hour so repeat searches don't hammer the API.
    next: { revalidate: 3600 },
    timeoutMs: 8000,
  });
  if (!res.ok) return null;

  try {
    return JSON.parse(res.text) as FmcsaEnvelope;
  } catch {
    console.error("[fmcsa] response was not valid JSON");
    return null;
  }
}

function num(v: number | string | undefined, fallback = 0): number {
  if (v === undefined || v === null) return fallback;
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

function slugify(name: string, dot: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${dot}`;
}

/** Our own 0-100 rollup, not an FMCSA-published score. Mirrors the
 *  weighting shown on /tools/carrier-lookup: Authority 30, Insurance 25,
 *  Inspections 30, Crashes 15. */
function computeHealthScore(c: RawFmcsaCarrier): number {
  let score = 0;

  const active = c.statusCode === "A" && c.allowedToOperate === "Y";
  score += active ? 30 : c.allowedToOperate === "Y" ? 18 : 0;

  score += c.bipdInsuranceOnFile === "Y" ? 15 : 0;
  score += c.cargoInsuranceOnFile === "Y" ? 10 : 0;

  const vehicleOos = num(c.vehicleOosRate);
  const driverOos = num(c.driverOosRate);
  const inspectionScore = 30 - Math.min(20, vehicleOos * 0.6) - Math.min(10, driverOos * 1.5);
  score += Math.max(0, inspectionScore);

  const crashes = num(c.crashTotal);
  score += Math.max(0, 15 - crashes * 3);

  if (c.safetyRating === "U") score = Math.min(score, 40);
  if (c.safetyRating === "C") score = Math.min(score, 70);

  return Math.max(0, Math.min(100, Math.round(score)));
}

function statusFor(c: RawFmcsaCarrier, score: number): CarrierStatus {
  if (c.statusCode !== "A" || c.allowedToOperate !== "Y") return "INACTIVE";
  if (score < 70) return "WARNING";
  return "ACTIVE";
}

function toCarrier(c: RawFmcsaCarrier): Carrier {
  const dot = String(c.dotNumber ?? "");
  const name = c.dbaName || c.legalName || "Unknown carrier";
  const score = computeHealthScore(c);
  return {
    slug: slugify(name, dot),
    name,
    city: c.phyCity ?? "—",
    st: c.phyState ?? "—",
    dot,
    mc: c.mcNumber ? `MC ${c.mcNumber}` : c.docketNumber ? `MC ${c.docketNumber}` : "—",
    trucks: num(c.totalPowerUnits),
    drivers: num(c.totalDrivers),
    status: statusFor(c, score),
    score,
    ageMonths: 0,
    insurance: c.bipdInsuranceOnFile === "Y" ? "ok" : "none",
    insuranceDate: "—",
    inspections: 0,
    oosVehicle: num(c.vehicleOosRate),
    oosDriver: num(c.driverOosRate),
    crashes: num(c.crashTotal),
    equipment: "—",
  };
}

function extractCarriers(envelope: FmcsaEnvelope | null): RawFmcsaCarrier[] {
  if (!envelope?.content) return [];
  const content = envelope.content;
  if (Array.isArray(content)) {
    return content.map((e) => e.carrier).filter((c): c is RawFmcsaCarrier => !!c);
  }
  return content.carrier ? [content.carrier] : [];
}

/** DOT number: 5-8 digits, nothing else. */
function isDotNumber(q: string): boolean {
  return /^\d{5,8}$/.test(q);
}

/** MC/docket number: optional "MC" prefix + digits. */
function parseDocketNumber(q: string): string | null {
  const m = q.trim().match(/^(?:mc\s*)?(\d{4,7})$/i);
  return m ? m[1] : null;
}

/**
 * Search live FMCSA data by DOT, MC/docket number, or company name.
 * Returns null if FMCSA_WEBKEY isn't configured or the request fails —
 * callers should fall back to sample data in that case, not show an error.
 */
export async function searchFmcsaCarriers(query: string): Promise<Carrier[] | null> {
  const q = query.trim();
  if (!q || !fmcsaEnabled()) return null;

  if (isDotNumber(q)) {
    const envelope = await fmcsaFetch(`/${q}`);
    if (!envelope) return null;
    return extractCarriers(envelope).map(toCarrier);
  }

  const docket = parseDocketNumber(q);
  if (docket) {
    const envelope = await fmcsaFetch(`/docket-number/${docket}`);
    if (!envelope) return null;
    return extractCarriers(envelope).map(toCarrier);
  }

  const envelope = await fmcsaFetch(`/name/${encodeURIComponent(q)}`);
  if (!envelope) return null;
  return extractCarriers(envelope).map(toCarrier);
}

/** Look up a single carrier by DOT number for a profile page. */
export async function fetchFmcsaCarrierByDot(dot: string): Promise<Carrier | null> {
  if (!isDotNumber(dot) || !fmcsaEnabled()) return null;
  const envelope = await fmcsaFetch(`/${dot}`);
  if (!envelope) return null;
  const [raw] = extractCarriers(envelope);
  return raw ? toCarrier(raw) : null;
}
