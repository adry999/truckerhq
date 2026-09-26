import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { KANSAS_CARRIERS } from "@/lib/carriers-kansas";

export const metadata: Metadata = {
  title: "Kansas Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Kansas, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Flatbed", "Reefer", "Power only"] as const;

const STATS = [
  { big: "16,600", small: "Active for-hire carriers" },
  { big: "418", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 39 },
  { t: "Flatbed", pct: 27 },
  { t: "Reefer", pct: 14 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 3 },
  { t: "Tanker", pct: 2 },
];

const TOP_CITIES = [
  { t: "Wichita", count: "3,940" },
  { t: "Kansas City", count: "2,815" },
  { t: "Overland Park", count: "2,260" },
  { t: "Topeka", count: "1,585" },
  { t: "Olathe", count: "1,120" },
  { t: "Lawrence", count: "760" },
];

export default function KansasCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="KS"
      stateName="Kansas"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Kansas highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Kansas, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={KANSAS_CARRIERS}
      totalCount="16,600"
      dispatchCtaEyebrow="KANSAS OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Kansas"
      dispatchCtaBody="We know the I-70/I-35 crossroads through Wichita and Kansas City and the grain and ag freight moving out of the wheat belt every fall. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Wichita, Overland Park and Topeka. We check CDL and MVR before you call."
      basePath="/carriers/kansas"
      searchParams={searchParams}
    />
  );
}
