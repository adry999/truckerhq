import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { NEW_JERSEY_CARRIERS } from "@/lib/carriers-new-jersey";

export const metadata: Metadata = {
  title: "New Jersey Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in New Jersey, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "19,300", small: "Active for-hire carriers" },
  { big: "612", small: "New MCs in the last 30 days" },
  { big: "74", small: "Average Health Score" },
  { big: "2.8", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 52 },
  { t: "Reefer", pct: 15 },
  { t: "Power only", pct: 12 },
  { t: "Flatbed", pct: 7 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Newark", count: "4,215" },
  { t: "Elizabeth", count: "2,680" },
  { t: "Jersey City", count: "1,940" },
  { t: "Camden", count: "1,305" },
  { t: "Trenton", count: "980" },
  { t: "Edison", count: "845" },
];

export default function NewJerseyCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="NJ"
      stateName="New Jersey"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="New Jersey highway with a semi truck near the port"
      heroDescription="Every for-hire interstate carrier based in New Jersey, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={NEW_JERSEY_CARRIERS}
      totalCount="19,300"
      dispatchCtaEyebrow="NEW JERSEY OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of New Jersey"
      dispatchCtaBody="We know the Port of NY/NJ drayage grind and the Exit 8A warehouse corridor along the Turnpike. One flat price per week, no percentage games."
      hireCtaBody="Post a job and reach drivers in Newark, Elizabeth and Jersey City. We check CDL and MVR before you call."
      basePath="/carriers/new-jersey"
      searchParams={searchParams}
    />
  );
}
