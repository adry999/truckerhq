import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { ILLINOIS_CARRIERS } from "@/lib/carriers-illinois";

export const metadata: Metadata = {
  title: "Illinois Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Illinois, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "34,600", small: "Active for-hire carriers" },
  { big: "967", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.8", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 38 },
  { t: "Power only", pct: 22 },
  { t: "Reefer", pct: 15 },
  { t: "Flatbed", pct: 12 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Chicago", count: "18,200" },
  { t: "Joliet", count: "4,510" },
  { t: "Rockford", count: "3,120" },
  { t: "Peoria", count: "2,340" },
  { t: "Aurora", count: "1,980" },
  { t: "Bloomington", count: "1,340" },
];

export default function IllinoisCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="IL"
      stateName="Illinois"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Illinois interstate with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Illinois, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={ILLINOIS_CARRIERS}
      totalCount="34,600"
      dispatchCtaEyebrow="ILLINOIS OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Illinois"
      dispatchCtaBody="We know Chicago's intermodal ramps and the I-80/I-55 corridors that feed them, plus the power-only freight that keeps containers moving. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Chicago, Joliet and Rockford. We check CDL and MVR before you call."
      basePath="/carriers/illinois"
      searchParams={searchParams}
    />
  );
}
