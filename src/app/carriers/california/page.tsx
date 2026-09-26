import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { CALIFORNIA_CARRIERS } from "@/lib/carriers-california";

export const metadata: Metadata = {
  title: "California Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in California, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "71,400", small: "Active for-hire carriers" },
  { big: "2,110", small: "New MCs in the last 30 days" },
  { big: "78", small: "Average Health Score" },
  { big: "2.9", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 38 },
  { t: "Reefer", pct: 24 },
  { t: "Flatbed", pct: 14 },
  { t: "Power only", pct: 11 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Los Angeles", count: "14,820" },
  { t: "Long Beach", count: "8,340" },
  { t: "Fresno", count: "5,910" },
  { t: "Oakland", count: "4,675" },
  { t: "Sacramento", count: "3,980" },
  { t: "San Diego", count: "3,412" },
];

export default function CaliforniaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="CA"
      stateName="California"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="California highway with a semi truck at sunset"
      heroDescription="Every for-hire interstate carrier based in California, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={CALIFORNIA_CARRIERS}
      totalCount="71,400"
      dispatchCtaEyebrow="CALIFORNIA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of California"
      dispatchCtaBody="We know the port drayage out of LA and Long Beach, the Central Valley ag freight up and down the I-5 corridor. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Los Angeles, Long Beach and Fresno. We check CDL and MVR before you call."
      basePath="/carriers/california"
      searchParams={searchParams}
    />
  );
}
