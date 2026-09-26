import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { RHODE_ISLAND_CARRIERS } from "@/lib/carriers-rhode-island";

export const metadata: Metadata = {
  title: "Rhode Island Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Rhode Island, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "3,400", small: "Active for-hire carriers" },
  { big: "68", small: "New MCs in the last 30 days" },
  { big: "77", small: "Average Health Score" },
  { big: "2.1", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Reefer", pct: 21 },
  { t: "Power only", pct: 13 },
  { t: "Flatbed", pct: 10 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Providence", count: "1,180" },
  { t: "Warwick", count: "612" },
  { t: "Cranston", count: "498" },
  { t: "Pawtucket", count: "355" },
  { t: "East Providence", count: "287" },
  { t: "Woonsocket", count: "204" },
];

export default function RhodeIslandCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="RI"
      stateName="Rhode Island"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Rhode Island highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Rhode Island, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={RHODE_ISLAND_CARRIERS}
      totalCount="3,400"
      dispatchCtaEyebrow="RHODE ISLAND OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Rhode Island"
      dispatchCtaBody="We run the I-95 corridor from the Connecticut line to the Massachusetts border and know the container queues at the Port of Providence cold. Rhode Island's compact geography means tighter turnarounds and more loads per week — one flat price covers it."
      hireCtaBody="Post a job and reach drivers in Providence, Warwick and Cranston. We check CDL and MVR before you call."
      basePath="/carriers/rhode-island"
      searchParams={searchParams}
    />
  );
}
