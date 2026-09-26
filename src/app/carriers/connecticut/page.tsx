import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { CONNECTICUT_CARRIERS } from "@/lib/carriers-connecticut";

export const metadata: Metadata = {
  title: "Connecticut Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Connecticut, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "11,800", small: "Active for-hire carriers" },
  { big: "318", small: "New MCs in the last 30 days" },
  { big: "72", small: "Average Health Score" },
  { big: "2.4", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 49 },
  { t: "Reefer", pct: 16 },
  { t: "Power only", pct: 13 },
  { t: "Flatbed", pct: 8 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Hartford", count: "2,940" },
  { t: "Bridgeport", count: "2,215" },
  { t: "New Haven", count: "1,980" },
  { t: "Stamford", count: "1,540" },
  { t: "Waterbury", count: "1,205" },
  { t: "Danbury", count: "940" },
];

export default function ConnecticutCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="CT"
      stateName="Connecticut"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Connecticut highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Connecticut, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={CONNECTICUT_CARRIERS}
      totalCount="11,800"
      dispatchCtaEyebrow="CONNECTICUT OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Connecticut"
      dispatchCtaBody="We know the I-95 corridor through Bridgeport and Stamford and the I-84 run through Hartford and Waterbury, plus the overflow freight spilling out of the NYC metro. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Hartford, Bridgeport and New Haven. We check CDL and MVR before you call."
      basePath="/carriers/connecticut"
      searchParams={searchParams}
    />
  );
}
