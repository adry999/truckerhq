import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { ARKANSAS_CARRIERS } from "@/lib/carriers-arkansas";

export const metadata: Metadata = {
  title: "Arkansas Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Arkansas, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "15,200", small: "Active for-hire carriers" },
  { big: "385", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Reefer", pct: 18 },
  { t: "Flatbed", pct: 15 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Little Rock", count: "5,120" },
  { t: "Fort Smith", count: "2,340" },
  { t: "Fayetteville", count: "1,980" },
  { t: "Springdale", count: "1,540" },
  { t: "Rogers", count: "1,210" },
  { t: "Jonesboro", count: "980" },
];

export default function ArkansasCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="AR"
      stateName="Arkansas"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Arkansas highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Arkansas, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={ARKANSAS_CARRIERS}
      totalCount="15,200"
      dispatchCtaEyebrow="ARKANSAS OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Arkansas"
      dispatchCtaBody="We know the NW Arkansas trucking corridor around Lowell and Springdale, home to some of the nation's largest carriers, plus the I-40 and I-30 freight lanes running through Little Rock and Fort Smith. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Little Rock, Fort Smith and Fayetteville. We check CDL and MVR before you call."
      basePath="/carriers/arkansas"
      searchParams={searchParams}
    />
  );
}
