import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { OREGON_CARRIERS } from "@/lib/carriers-oregon";

export const metadata: Metadata = {
  title: "Oregon Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Oregon, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "16,800", small: "Active for-hire carriers" },
  { big: "398", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 38 },
  { t: "Flatbed", pct: 22 },
  { t: "Reefer", pct: 15 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 7 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Portland", count: "5,940" },
  { t: "Salem", count: "2,215" },
  { t: "Eugene", count: "1,780" },
  { t: "Hillsboro", count: "1,340" },
  { t: "Gresham", count: "1,065" },
  { t: "Bend", count: "845" },
];

export default function OregonCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="OR"
      stateName="Oregon"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Oregon highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Oregon, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={OREGON_CARRIERS}
      totalCount="16,800"
      dispatchCtaEyebrow="OREGON OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Oregon"
      dispatchCtaBody="We know the I-5 corridor through the Willamette Valley and the I-84 freight lanes through the Gorge, plus the container and bulk traffic moving through the Port of Portland. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Portland, Salem and Eugene. We check CDL and MVR before you call."
      basePath="/carriers/oregon"
      searchParams={searchParams}
    />
  );
}
