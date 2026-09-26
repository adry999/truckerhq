import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { ARIZONA_CARRIERS } from "@/lib/carriers-arizona";

export const metadata: Metadata = {
  title: "Arizona Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Arizona, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "24,700", small: "Active for-hire carriers" },
  { big: "615", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.9", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 43 },
  { t: "Reefer", pct: 18 },
  { t: "Flatbed", pct: 15 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Phoenix", count: "8,940" },
  { t: "Tucson", count: "4,215" },
  { t: "Mesa", count: "2,680" },
  { t: "Chandler", count: "1,950" },
  { t: "Yuma", count: "1,340" },
  { t: "Flagstaff", count: "915" },
];

export default function ArizonaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="AZ"
      stateName="Arizona"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Arizona highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Arizona, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={ARIZONA_CARRIERS}
      totalCount="24,700"
      dispatchCtaEyebrow="ARIZONA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Arizona"
      dispatchCtaBody="We know the I-10/I-40 crossroads through Phoenix and the cross-border freight coming up from Nogales, Arizona's busiest port of entry for Mexican trailers. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Phoenix, Tucson and Mesa. We check CDL and MVR before you call."
      basePath="/carriers/arizona"
      searchParams={searchParams}
    />
  );
}
