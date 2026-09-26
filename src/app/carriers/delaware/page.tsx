import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { DELAWARE_CARRIERS } from "@/lib/carriers-delaware";

export const metadata: Metadata = {
  title: "Delaware Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Delaware, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "4,900", small: "Active for-hire carriers" },
  { big: "156", small: "New MCs in the last 30 days" },
  { big: "78", small: "Average Health Score" },
  { big: "3.4", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 48 },
  { t: "Reefer", pct: 18 },
  { t: "Power only", pct: 12 },
  { t: "Flatbed", pct: 10 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Wilmington", count: "1,850" },
  { t: "Dover", count: "890" },
  { t: "Newark", count: "720" },
  { t: "Middletown", count: "410" },
  { t: "Smyrna", count: "285" },
  { t: "Milford", count: "210" },
];

export default function DelawareCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="DE"
      stateName="Delaware"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Delaware highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Delaware, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={DELAWARE_CARRIERS}
      totalCount="4,900"
      dispatchCtaEyebrow="DELAWARE OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Delaware"
      dispatchCtaBody="We know the I-95 corridor from the Maryland line through Wilmington and the container freight moving through the Port of Wilmington. Delaware's no sales tax keeps distribution centers stacked along Route 1, and we price it at one flat rate per week."
      hireCtaBody="Post a job and reach drivers in Wilmington, Dover and Newark. We check CDL and MVR before you call."
      basePath="/carriers/delaware"
      searchParams={searchParams}
    />
  );
}
