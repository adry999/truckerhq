import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { MINNESOTA_CARRIERS } from "@/lib/carriers-minnesota";

export const metadata: Metadata = {
  title: "Minnesota Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Minnesota, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "22,400", small: "Active for-hire carriers" },
  { big: "568", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Reefer", pct: 21 },
  { t: "Flatbed", pct: 13 },
  { t: "Power only", pct: 9 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Minneapolis", count: "6,140" },
  { t: "St. Paul", count: "3,825" },
  { t: "Bloomington", count: "1,960" },
  { t: "St. Cloud", count: "1,410" },
  { t: "Rochester", count: "1,205" },
  { t: "Duluth", count: "980" },
];

export default function MinnesotaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="MN"
      stateName="Minnesota"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Minnesota highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Minnesota, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={MINNESOTA_CARRIERS}
      totalCount="22,400"
      dispatchCtaEyebrow="MINNESOTA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Minnesota"
      dispatchCtaBody="We know the I-35 run down to the Twin Cities and the I-94 lane out to Fargo, plus the ag and food freight moving out of St. Cloud and Rochester. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Minneapolis, St. Paul and Rochester. We check CDL and MVR before you call."
      basePath="/carriers/minnesota"
      searchParams={searchParams}
    />
  );
}
