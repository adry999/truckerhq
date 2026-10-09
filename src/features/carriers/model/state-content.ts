import type { StateContentEntry } from "@/features/carriers/model/carriers.types";
import type { StateData } from "@/features/carriers/model/state-data.schema";

const STAT_LABELS = [
  "Active for-hire carriers",
  "New MCs in the last 30 days",
  "Average Health Score",
  "Trucks per carrier, average",
] as const;

/** Expands a state's raw data into the entry the pages render. A raw field always wins over its template. */
export function buildStateContent(raw: StateData): StateContentEntry {
  const { stateName } = raw;
  return {
    stateAbbr: raw.stateAbbr,
    stateName,
    title: raw.title ?? `${stateName} Carriers — DOT/MC Directory`,
    description:
      raw.description ??
      `For-hire interstate carriers based in ${stateName}. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.`,
    heroImage: raw.heroImage,
    heroAlt: raw.heroAlt,
    heroDescription:
      raw.heroDescription ??
      `For-hire interstate carriers based in ${stateName}. Search, filter and check any Health Score.`,
    stats: raw.stats.map((big, i) => ({ big, small: STAT_LABELS[i] })),
    equipmentBreakdown: raw.equipmentBreakdown,
    topCities: raw.topCities,
    equipmentOptions: raw.equipmentOptions,
    totalCount: raw.stats[0],
    dispatchCtaEyebrow: raw.dispatchCtaEyebrow ?? `${stateName.toUpperCase()} OWNER-OPERATOR?`,
    dispatchCtaTitle: raw.dispatchCtaTitle ?? `Flat dispatch out of ${stateName}`,
    dispatchCtaBody: raw.dispatchCtaBody,
    hireCtaBody: raw.hireCtaBody,
    carriers: raw.carriers,
  };
}
