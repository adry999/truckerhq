import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { PENNSYLVANIA_CARRIERS } from "@/lib/carriers-pennsylvania";

export const metadata: Metadata = {
  title: "Pennsylvania Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Pennsylvania, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "26,100", small: "Active for-hire carriers" },
  { big: "742", small: "New MCs in the last 30 days" },
  { big: "74", small: "Average Health Score" },
  { big: "2.8", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 47 },
  { t: "Flatbed", pct: 17 },
  { t: "Reefer", pct: 14 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Philadelphia", count: "5,940" },
  { t: "Pittsburgh", count: "4,615" },
  { t: "Harrisburg", count: "3,280" },
  { t: "Allentown", count: "2,470" },
  { t: "Scranton", count: "1,865" },
  { t: "Erie", count: "1,340" },
];

export default function PennsylvaniaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="PA"
      stateName="Pennsylvania"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Pennsylvania highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Pennsylvania, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={PENNSYLVANIA_CARRIERS}
      totalCount="26,100"
      dispatchCtaEyebrow="PENNSYLVANIA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Pennsylvania"
      dispatchCtaBody="We know the I-78 and I-81 corridor, and the Harrisburg and Lehigh Valley warehouse belt puts you within a day's drive of a third of the US population. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Philadelphia, Pittsburgh and Harrisburg. We check CDL and MVR before you call."
      basePath="/carriers/pennsylvania"
      searchParams={searchParams}
    />
  );
}
