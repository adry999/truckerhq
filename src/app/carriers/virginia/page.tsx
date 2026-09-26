import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { VIRGINIA_CARRIERS } from "@/lib/carriers-virginia";

export const metadata: Metadata = {
  title: "Virginia Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Virginia, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "23,600", small: "Active for-hire carriers" },
  { big: "612", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.9", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Reefer", pct: 18 },
  { t: "Flatbed", pct: 15 },
  { t: "Power only", pct: 8 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 4 },
];

const TOP_CITIES = [
  { t: "Norfolk", count: "5,240" },
  { t: "Virginia Beach", count: "4,180" },
  { t: "Chesapeake", count: "3,315" },
  { t: "Richmond", count: "3,020" },
  { t: "Newport News", count: "2,140" },
  { t: "Alexandria", count: "1,860" },
];

export default function VirginiaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="VA"
      stateName="Virginia"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Virginia highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Virginia, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={VIRGINIA_CARRIERS}
      totalCount="23,600"
      dispatchCtaEyebrow="VIRGINIA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Virginia"
      dispatchCtaBody="We know the container freight rolling out of the Port of Virginia in Norfolk and the I-95/I-64 corridor linking Richmond to Hampton Roads. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Norfolk, Richmond and Virginia Beach. We check CDL and MVR before you call."
      basePath="/carriers/virginia"
      searchParams={searchParams}
    />
  );
}
