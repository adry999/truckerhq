import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { NEBRASKA_CARRIERS } from "@/lib/carriers-nebraska";

export const metadata: Metadata = {
  title: "Nebraska Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Nebraska, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "14,500", small: "Active for-hire carriers" },
  { big: "356", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Flatbed", pct: 20 },
  { t: "Reefer", pct: 13 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 6 },
  { t: "Tanker", pct: 4 },
  { t: "Box truck", pct: 3 },
];

const TOP_CITIES = [
  { t: "Omaha", count: "4,860" },
  { t: "Lincoln", count: "2,715" },
  { t: "Grand Island", count: "1,140" },
  { t: "Bellevue", count: "845" },
  { t: "Kearney", count: "610" },
  { t: "Fremont", count: "480" },
];

export default function NebraskaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="NE"
      stateName="Nebraska"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Nebraska highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Nebraska, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={NEBRASKA_CARRIERS}
      totalCount="14,500"
      dispatchCtaEyebrow="NEBRASKA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Nebraska"
      dispatchCtaBody="We know the I-80 corridor from Omaha to the Wyoming line and Nebraska's role as an ag and rail freight hub, from Union Pacific's Omaha yards to the grain elevators along the Platte. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Omaha, Lincoln and Grand Island. We check CDL and MVR before you call."
      basePath="/carriers/nebraska"
      searchParams={searchParams}
    />
  );
}
