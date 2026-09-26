import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { WISCONSIN_CARRIERS } from "@/lib/carriers-wisconsin";

export const metadata: Metadata = {
  title: "Wisconsin Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Wisconsin, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "21,900", small: "Active for-hire carriers" },
  { big: "588", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.9", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 43 },
  { t: "Reefer", pct: 21 },
  { t: "Flatbed", pct: 13 },
  { t: "Power only", pct: 9 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Milwaukee", count: "5,940" },
  { t: "Madison", count: "3,215" },
  { t: "Green Bay", count: "2,180" },
  { t: "Appleton", count: "1,540" },
  { t: "Kenosha", count: "1,190" },
  { t: "Racine", count: "980" },
];

export default function WisconsinCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="WI"
      stateName="Wisconsin"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Wisconsin highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Wisconsin, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={WISCONSIN_CARRIERS}
      totalCount="21,900"
      dispatchCtaEyebrow="WISCONSIN OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Wisconsin"
      dispatchCtaBody="We know the I-94/I-43 corridor between Milwaukee and Green Bay, and the dairy and food-grade freight that keeps reefers moving out of the state's processing plants. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Milwaukee, Madison and Green Bay. We check CDL and MVR before you call."
      basePath="/carriers/wisconsin"
      searchParams={searchParams}
    />
  );
}
