import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { COLORADO_CARRIERS } from "@/lib/carriers-colorado";

export const metadata: Metadata = {
  title: "Colorado Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Colorado, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Flatbed", "Reefer", "Power only"] as const;

const STATS = [
  { big: "23,900", small: "Active for-hire carriers" },
  { big: "612", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 38 },
  { t: "Flatbed", pct: 22 },
  { t: "Reefer", pct: 14 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 8 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Denver", count: "8,450" },
  { t: "Colorado Springs", count: "3,920" },
  { t: "Aurora", count: "2,610" },
  { t: "Fort Collins", count: "1,845" },
  { t: "Pueblo", count: "1,290" },
  { t: "Grand Junction", count: "980" },
];

export default function ColoradoCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="CO"
      stateName="Colorado"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Semi truck on a Colorado mountain highway at dusk"
      heroDescription="Every for-hire interstate carrier based in Colorado, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={COLORADO_CARRIERS}
      totalCount="23,900"
      dispatchCtaEyebrow="COLORADO OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Colorado"
      dispatchCtaBody="We know the I-70 mountain corridor through the Eisenhower Tunnel and the I-25 freight run connecting Denver to Colorado Springs and Cheyenne. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Denver, Colorado Springs and Fort Collins. We check CDL and MVR before you call."
      basePath="/carriers/colorado"
      searchParams={searchParams}
    />
  );
}
