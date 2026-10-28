import type { StateContentEntry } from "@/features/carriers/model/carriers.types";
import type { CensusSource, StateCensus } from "@/features/carriers/model/census.schema";
import type { StateData } from "@/features/carriers/model/state-data.schema";

const number = new Intl.NumberFormat("en-US");
const monthYear = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

export function formatCount(n: number): string {
  return number.format(n);
}

/** "October 2026" for the census fetch timestamp. */
export function formatCensusDate(iso: string): string {
  return monthYear.format(new Date(iso));
}

/** Expands a state's editorial data and its census numbers into the entry the pages render. A raw field always wins over its template. */
export function buildStateContent(raw: StateData, census: StateCensus, source: CensusSource): StateContentEntry {
  const { stateName } = raw;
  const total = formatCount(census.activeForHire);
  return {
    stateAbbr: raw.stateAbbr,
    stateName,
    title: raw.title ?? `${stateName} trucking carriers: ${total} active for-hire carriers (FMCSA data)`,
    description:
      raw.description ??
      `${total} active interstate for-hire carriers are based in ${stateName}, per FMCSA census data. Look up any DOT or MC number and check its Health Score.`,
    heroImage: raw.heroImage,
    heroAlt: raw.heroAlt,
    heroDescription:
      raw.heroDescription ??
      `${total} active interstate for-hire carriers are based in ${stateName}, per FMCSA census data. Look up any DOT or MC number and check its Health Score.`,
    stats: [
      { big: total, small: "Active for-hire carriers" },
      { big: formatCount(census.newLast12Months), small: "New carriers in the last 12 months" },
      { big: `${Math.round(census.smallFleetShare)}%`, small: "Small fleets (1-5 power units)" },
      { big: formatCount(census.powerUnits), small: "Power units registered" },
    ],
    topCities: census.topCities.map((c) => ({ t: c.city, count: formatCount(c.count) })),
    totalCount: total,
    census: { activeForHire: census.activeForHire, powerUnits: census.powerUnits, drivers: census.drivers },
    sourceName: source.name,
    sourceUrl: source.url,
    sourceFetchedAt: source.fetchedAt,
    dispatchCtaEyebrow: raw.dispatchCtaEyebrow ?? `${stateName.toUpperCase()} OWNER-OPERATOR?`,
    dispatchCtaTitle: raw.dispatchCtaTitle ?? `Flat dispatch out of ${stateName}`,
    dispatchCtaBody: raw.dispatchCtaBody,
    hireCtaBody: raw.hireCtaBody,
  };
}
