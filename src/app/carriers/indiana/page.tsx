import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { INDIANA_CARRIERS } from "@/lib/carriers-indiana";

export const metadata: Metadata = {
  title: "Indiana Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Indiana, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "30,200", small: "Active for-hire carriers" },
  { big: "810", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.9", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Reefer", pct: 18 },
  { t: "Flatbed", pct: 15 },
  { t: "Power only", pct: 9 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Indianapolis", count: "8,940" },
  { t: "Fort Wayne", count: "3,215" },
  { t: "Evansville", count: "2,180" },
  { t: "South Bend", count: "1,760" },
  { t: "Carmel", count: "1,340" },
  { t: "Fishers", count: "1,125" },
];

export default function IndianaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="IN"
      stateName="Indiana"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Indiana highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Indiana, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={INDIANA_CARRIERS}
      totalCount="30,200"
      dispatchCtaEyebrow="INDIANA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Indiana"
      dispatchCtaBody="We know the I-65/I-70/I-69 interchange that makes Indianapolis the busiest inland port in the country, and the freight that flows through it in every direction. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Indianapolis, Fort Wayne and Evansville. We check CDL and MVR before you call."
      basePath="/carriers/indiana"
      searchParams={searchParams}
    />
  );
}
