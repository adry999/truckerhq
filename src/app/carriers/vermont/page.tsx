import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { VERMONT_CARRIERS } from "@/lib/carriers-vermont";

export const metadata: Metadata = {
  title: "Vermont Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Vermont, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "3,900", small: "Active for-hire carriers" },
  { big: "58", small: "New MCs in the last 30 days" },
  { big: "77", small: "Average Health Score" },
  { big: "2.4", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 34 },
  { t: "Reefer", pct: 27 },
  { t: "Flatbed", pct: 14 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 6 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Burlington", count: "1,140" },
  { t: "South Burlington", count: "640" },
  { t: "Rutland", count: "490" },
  { t: "Barre", count: "385" },
  { t: "Montpelier", count: "310" },
  { t: "St. Albans", count: "275" },
];

export default function VermontCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="VT"
      stateName="Vermont"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Vermont highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Vermont, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={VERMONT_CARRIERS}
      totalCount="3,900"
      dispatchCtaEyebrow="VERMONT OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Vermont"
      dispatchCtaBody="We know the I-89 corridor up to the Canadian border crossing at Highgate Springs and the I-91 dairy freight lanes through the Connecticut River Valley. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Burlington, Rutland and Montpelier. We check CDL and MVR before you call."
      basePath="/carriers/vermont"
      searchParams={searchParams}
    />
  );
}
