import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { NEVADA_CARRIERS } from "@/lib/carriers-nevada";

export const metadata: Metadata = {
  title: "Nevada Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Nevada, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "13,700", small: "Active for-hire carriers" },
  { big: "385", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Power only", pct: 21 },
  { t: "Reefer", pct: 12 },
  { t: "Flatbed", pct: 10 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Las Vegas", count: "6,850" },
  { t: "Henderson", count: "2,190" },
  { t: "Reno", count: "1,980" },
  { t: "North Las Vegas", count: "1,340" },
  { t: "Sparks", count: "610" },
  { t: "Carson City", count: "340" },
];

export default function NevadaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="NV"
      stateName="Nevada"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Nevada desert highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Nevada, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={NEVADA_CARRIERS}
      totalCount="13,700"
      dispatchCtaEyebrow="NEVADA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Nevada"
      dispatchCtaBody="We run the I-15 corridor through Las Vegas and the I-80 lanes across Reno, where the fast-growing Tahoe-Reno Industrial Center has turned the area into one of the West's busiest warehouse and distribution hubs. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Las Vegas, Henderson and Reno. We check CDL and MVR before you call."
      basePath="/carriers/nevada"
      searchParams={searchParams}
    />
  );
}
