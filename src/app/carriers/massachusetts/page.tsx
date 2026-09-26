import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { MASSACHUSETTS_CARRIERS } from "@/lib/carriers-massachusetts";

export const metadata: Metadata = {
  title: "Massachusetts Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Massachusetts, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "21,300", small: "Active for-hire carriers" },
  { big: "612", small: "New MCs in the last 30 days" },
  { big: "74", small: "Average Health Score" },
  { big: "2.8", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 46 },
  { t: "Reefer", pct: 17 },
  { t: "Power only", pct: 14 },
  { t: "Flatbed", pct: 8 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 4 },
];

const TOP_CITIES = [
  { t: "Boston", count: "5,940" },
  { t: "Worcester", count: "2,815" },
  { t: "Springfield", count: "2,340" },
  { t: "Lowell", count: "1,690" },
  { t: "Cambridge", count: "1,205" },
  { t: "New Bedford", count: "985" },
];

export default function MassachusettsCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="MA"
      stateName="Massachusetts"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Semi truck on a Massachusetts highway near Boston"
      heroDescription="Every for-hire interstate carrier based in Massachusetts, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={MASSACHUSETTS_CARRIERS}
      totalCount="21,300"
      dispatchCtaEyebrow="MASSACHUSETTS OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Massachusetts"
      dispatchCtaBody="We work the I-90 and I-95 corridors and the container freight moving through the Port of Boston. One flat price per week, no per-load cut."
      hireCtaBody="Post a job and reach drivers in Boston, Worcester and Springfield. We check CDL and MVR before you call."
      basePath="/carriers/massachusetts"
      searchParams={searchParams}
    />
  );
}
