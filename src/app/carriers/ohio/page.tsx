import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { OHIO_CARRIERS } from "@/lib/carriers-ohio";

export const metadata: Metadata = {
  title: "Ohio Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Ohio, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "27,500", small: "Active for-hire carriers" },
  { big: "742", small: "New MCs in the last 30 days" },
  { big: "74", small: "Average Health Score" },
  { big: "2.8", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 46 },
  { t: "Flatbed", pct: 21 },
  { t: "Reefer", pct: 14 },
  { t: "Power only", pct: 8 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Columbus", count: "5,410" },
  { t: "Cincinnati", count: "4,275" },
  { t: "Cleveland", count: "3,960" },
  { t: "Toledo", count: "2,180" },
  { t: "Dayton", count: "1,845" },
  { t: "Akron", count: "1,502" },
];

export default function OhioCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="OH"
      stateName="Ohio"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Ohio highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Ohio, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={OHIO_CARRIERS}
      totalCount="27,500"
      dispatchCtaEyebrow="OHIO OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Ohio"
      dispatchCtaBody="We know the I-70/I-71/I-75 crossroads and how Columbus puts you within a day's drive of most of the eastern US population. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Columbus, Cincinnati and Cleveland. We check CDL and MVR before you call."
      basePath="/carriers/ohio"
      searchParams={searchParams}
    />
  );
}
