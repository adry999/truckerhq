import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { NORTH_DAKOTA_CARRIERS } from "@/lib/carriers-north-dakota";

export const metadata: Metadata = {
  title: "North Dakota Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in North Dakota, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Flatbed", "Power only", "Dry van", "Reefer", "Tanker"] as const;

const STATS = [
  { big: "6,200", small: "Active for-hire carriers" },
  { big: "148", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Flatbed", pct: 34 },
  { t: "Power only", pct: 22 },
  { t: "Dry van", pct: 16 },
  { t: "Reefer", pct: 10 },
  { t: "Tanker", pct: 9 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 3 },
];

const TOP_CITIES = [
  { t: "Fargo", count: "980" },
  { t: "Bismarck", count: "740" },
  { t: "Grand Forks", count: "410" },
  { t: "Minot", count: "385" },
  { t: "Williston", count: "340" },
  { t: "West Fargo", count: "210" },
];

export default function NorthDakotaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="ND"
      stateName="North Dakota"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="North Dakota highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in North Dakota, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={NORTH_DAKOTA_CARRIERS}
      totalCount="6,200"
      dispatchCtaEyebrow="NORTH DAKOTA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of North Dakota"
      dispatchCtaBody="We know the I-94 corridor across the state and the oil-patch tanker and flatbed freight moving through the Bakken around Williston. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Fargo, Bismarck and Williston. We check CDL and MVR before you call."
      basePath="/carriers/north-dakota"
      searchParams={searchParams}
    />
  );
}
