import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { ALABAMA_CARRIERS } from "@/lib/carriers-alabama";

export const metadata: Metadata = {
  title: "Alabama Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Alabama, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "16,500", small: "Active for-hire carriers" },
  { big: "398", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Flatbed", pct: 18 },
  { t: "Reefer", pct: 15 },
  { t: "Power only", pct: 9 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Birmingham", count: "4,610" },
  { t: "Mobile", count: "2,845" },
  { t: "Montgomery", count: "2,190" },
  { t: "Huntsville", count: "1,930" },
  { t: "Tuscaloosa", count: "1,205" },
  { t: "Dothan", count: "870" },
];

export default function AlabamaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="AL"
      stateName="Alabama"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Alabama highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Alabama, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={ALABAMA_CARRIERS}
      totalCount="16,500"
      dispatchCtaEyebrow="ALABAMA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Alabama"
      dispatchCtaBody="We know the I-65/I-20 corridor through Birmingham and the container freight moving through the Port of Mobile. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Birmingham, Montgomery and Mobile. We check CDL and MVR before you call."
      basePath="/carriers/alabama"
      searchParams={searchParams}
    />
  );
}
