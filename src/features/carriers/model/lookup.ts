import type { Carrier, CarrierStatus } from "@/features/carriers/model/carriers.types";

export const LOOKUP_PATH = "/tools/carrier-lookup";

export const MODES = ["All", "DOT", "MC", "Name"] as const;
export const STATUSES = ["All", "ACTIVE", "WARNING", "INACTIVE"] as const;

export type LookupStatusFilter = (typeof STATUSES)[number];

export const SCORE_FACTORS = [
  { t: "Authority", w: "30 pts", d: "Is the MC active, and how long has it been active?" },
  { t: "Insurance", w: "25 pts", d: "Liability and cargo on file, and how soon it expires." },
  { t: "Inspections", w: "30 pts", d: "Out-of-service rates compared to the national average." },
  { t: "Crashes", w: "15 pts", d: "Reportable crashes in the last 24 months." },
];

export const RECENT_SEARCHES = [
  ["DOT 3412897", "3412897"],
  ["MC 1420876", "1420876"],
  ["Freight", "freight"],
];

export function normalizeQuery(raw: string): string {
  return raw.trim().toLowerCase().replace(/^(dot|mc)\s*/, "");
}

export function matchSampleCarriers(carriers: Carrier[], rawQuery: string): Carrier[] {
  const q = normalizeQuery(rawQuery);
  return carriers.filter(
    (c) =>
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.dot.includes(q) ||
      c.mc.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q),
  );
}

export function filterByStatus(carriers: Carrier[], status: string): Carrier[] {
  return carriers.filter((c) => status === "All" || c.status === status);
}

export function countByStatus(carriers: Carrier[], status: LookupStatusFilter | CarrierStatus): number {
  return filterByStatus(carriers, status).length;
}

export function modeHref(mode: string): string {
  const sp = new URLSearchParams();
  if (mode !== "All") sp.set("mode", mode);
  const qs = sp.toString();
  return qs ? `${LOOKUP_PATH}?${qs}` : LOOKUP_PATH;
}

export function statusHref(rawQuery: string, status: string): string {
  const sp = new URLSearchParams({ q: rawQuery });
  if (status !== "All") sp.set("status", status);
  return `${LOOKUP_PATH}?${sp.toString()}`;
}

export function searchPlaceholder(mode: string): string {
  if (mode === "DOT") return "DOT number, e.g. 3412897";
  if (mode === "MC") return "MC number, e.g. 1182044";
  if (mode === "Name") return "Company name";
  return "Search any carrier by DOT, MC or name";
}

export function dataSourceNote(usingLiveData: boolean, liveSearchAvailable: boolean): string {
  if (usingLiveData) return "Live data from FMCSA public records.";
  if (liveSearchAvailable) return "No live FMCSA match. Showing sample data instead.";
  return "Sample data. Real results come from FMCSA records, updated every 24 hours.";
}
