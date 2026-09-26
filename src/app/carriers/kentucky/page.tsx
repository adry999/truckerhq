import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { KENTUCKY_CARRIERS } from "@/lib/carriers-kentucky";

export const metadata: Metadata = {
  title: "Kentucky Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Kentucky, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "19,700", small: "Active for-hire carriers" },
  { big: "486", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.7", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Power only", pct: 18 },
  { t: "Reefer", pct: 15 },
  { t: "Flatbed", pct: 12 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 2 },
];

const TOP_CITIES = [
  { t: "Louisville", count: "6,340" },
  { t: "Lexington", count: "3,215" },
  { t: "Covington", count: "1,980" },
  { t: "Bowling Green", count: "1,540" },
  { t: "Owensboro", count: "1,105" },
  { t: "Richmond", count: "845" },
];

export default function KentuckyCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="KY"
      stateName="Kentucky"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Kentucky highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Kentucky, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={KENTUCKY_CARRIERS}
      totalCount="19,700"
      dispatchCtaEyebrow="KENTUCKY OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Kentucky"
      dispatchCtaBody="We know the UPS Worldport air-to-ground hub in Louisville and the freight that stacks up where I-64, I-65 and I-75 cross the state. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Louisville, Lexington and Bowling Green. We check CDL and MVR before you call."
      basePath="/carriers/kentucky"
      searchParams={searchParams}
    />
  );
}
