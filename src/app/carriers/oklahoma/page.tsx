import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { OKLAHOMA_CARRIERS } from "@/lib/carriers-oklahoma";

export const metadata: Metadata = {
  title: "Oklahoma Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Oklahoma, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Flatbed", "Reefer", "Power only"] as const;

const STATS = [
  { big: "19,100", small: "Active for-hire carriers" },
  { big: "486", small: "New MCs in the last 30 days" },
  { big: "72", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 39 },
  { t: "Flatbed", pct: 22 },
  { t: "Reefer", pct: 14 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 7 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Oklahoma City", count: "6,850" },
  { t: "Tulsa", count: "5,120" },
  { t: "Norman", count: "1,340" },
  { t: "Broken Arrow", count: "1,205" },
  { t: "Edmond", count: "980" },
  { t: "Lawton", count: "810" },
];

export default function OklahomaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="OK"
      stateName="Oklahoma"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Oklahoma highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Oklahoma, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={OKLAHOMA_CARRIERS}
      totalCount="19,100"
      dispatchCtaEyebrow="OKLAHOMA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Oklahoma"
      dispatchCtaBody="We know the I-35/I-40 crossroads through Oklahoma City and the energy-sector flatbed freight hauling rigs, pipe and equipment across the state. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Oklahoma City, Tulsa and Norman. We check CDL and MVR before you call."
      basePath="/carriers/oklahoma"
      searchParams={searchParams}
    />
  );
}
