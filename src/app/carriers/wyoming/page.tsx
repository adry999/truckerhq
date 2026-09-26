import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { WYOMING_CARRIERS } from "@/lib/carriers-wyoming";

export const metadata: Metadata = {
  title: "Wyoming Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Wyoming, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Flatbed", "Power only", "Dry van", "Reefer"] as const;

const STATS = [
  { big: "4,700", small: "Active for-hire carriers" },
  { big: "58", small: "New MCs in the last 30 days" },
  { big: "81", small: "Average Health Score" },
  { big: "2.2", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Flatbed", pct: 34 },
  { t: "Power only", pct: 24 },
  { t: "Dry van", pct: 18 },
  { t: "Reefer", pct: 10 },
  { t: "Tanker", pct: 6 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 3 },
];

const TOP_CITIES = [
  { t: "Cheyenne", count: "1,340" },
  { t: "Casper", count: "980" },
  { t: "Gillette", count: "650" },
  { t: "Laramie", count: "540" },
  { t: "Rock Springs", count: "410" },
  { t: "Sheridan", count: "340" },
];

export default function WyomingCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="WY"
      stateName="Wyoming"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Wyoming highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Wyoming, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={WYOMING_CARRIERS}
      totalCount="4,700"
      dispatchCtaEyebrow="WYOMING OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Wyoming"
      dispatchCtaBody="We know the I-80 corridor across the southern plains and the I-25 run past the Powder River Basin coal fields. One flat price per week, energy and coal freight included."
      hireCtaBody="Post a job and reach drivers in Cheyenne, Casper and Gillette. We check CDL and MVR before you call."
      basePath="/carriers/wyoming"
      searchParams={searchParams}
    />
  );
}
