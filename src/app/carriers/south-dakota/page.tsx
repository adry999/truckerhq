import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { SOUTH_DAKOTA_CARRIERS } from "@/lib/carriers-south-dakota";

export const metadata: Metadata = {
  title: "South Dakota Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in South Dakota, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Flatbed", "Reefer", "Dry van", "Power only"] as const;

const STATS = [
  { big: "7,100", small: "Active for-hire carriers" },
  { big: "168", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Flatbed", pct: 34 },
  { t: "Reefer", pct: 24 },
  { t: "Dry van", pct: 20 },
  { t: "Power only", pct: 11 },
  { t: "Step deck", pct: 6 },
  { t: "Livestock", pct: 4 },
  { t: "Tanker", pct: 1 },
];

const TOP_CITIES = [
  { t: "Sioux Falls", count: "2,340" },
  { t: "Rapid City", count: "1,415" },
  { t: "Aberdeen", count: "620" },
  { t: "Watertown", count: "395" },
  { t: "Brookings", count: "310" },
  { t: "Mitchell", count: "245" },
];

export default function SouthDakotaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="SD"
      stateName="South Dakota"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="South Dakota highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in South Dakota, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={SOUTH_DAKOTA_CARRIERS}
      totalCount="7,100"
      dispatchCtaEyebrow="SOUTH DAKOTA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of South Dakota"
      dispatchCtaBody="We know the I-90 run across the state and the I-29 corridor up to Fargo, plus the ag and livestock freight that moves through Sioux Falls and Aberdeen. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Sioux Falls, Rapid City and Aberdeen. We check CDL and MVR before you call."
      basePath="/carriers/south-dakota"
      searchParams={searchParams}
    />
  );
}
