import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { MONTANA_CARRIERS } from "@/lib/carriers-montana";

export const metadata: Metadata = {
  title: "Montana Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Montana, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Flatbed", "Dry van", "Reefer", "Power only"] as const;

const STATS = [
  { big: "9,640", small: "Active for-hire carriers" },
  { big: "186", small: "New MCs in the last 30 days" },
  { big: "71", small: "Average Health Score" },
  { big: "2.4", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Flatbed", pct: 34 },
  { t: "Dry van", pct: 28 },
  { t: "Power only", pct: 14 },
  { t: "Reefer", pct: 10 },
  { t: "Step deck", pct: 6 },
  { t: "Tanker", pct: 5 },
  { t: "Box truck", pct: 3 },
];

const TOP_CITIES = [
  { t: "Billings", count: "2,410" },
  { t: "Missoula", count: "1,650" },
  { t: "Great Falls", count: "1,280" },
  { t: "Bozeman", count: "1,050" },
  { t: "Helena", count: "780" },
  { t: "Butte", count: "590" },
];

export default function MontanaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="MT"
      stateName="Montana"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Montana highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Montana, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={MONTANA_CARRIERS}
      totalCount="9,640"
      dispatchCtaEyebrow="MONTANA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Montana"
      dispatchCtaBody="We know the long hauls across I-90 and I-15, where the nearest reload can be 300 miles away, plus the seasonal grain and livestock runs out of the Golden Triangle. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Billings, Missoula and Great Falls. We check CDL and MVR before you call."
      basePath="/carriers/montana"
      searchParams={searchParams}
    />
  );
}
