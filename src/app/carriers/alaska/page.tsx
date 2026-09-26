import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { ALASKA_CARRIERS } from "@/lib/carriers-alaska";

export const metadata: Metadata = {
  title: "Alaska Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Alaska, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Flatbed", "Power only", "Reefer"] as const;

const STATS = [
  { big: "2,100", small: "Active for-hire carriers" },
  { big: "38", small: "New MCs in the last 30 days" },
  { big: "71", small: "Average Health Score" },
  { big: "2.4", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 34 },
  { t: "Flatbed", pct: 24 },
  { t: "Power only", pct: 18 },
  { t: "Step deck", pct: 8 },
  { t: "Reefer", pct: 6 },
  { t: "Box truck", pct: 6 },
  { t: "Tanker", pct: 4 },
];

const TOP_CITIES = [
  { t: "Anchorage", count: "890" },
  { t: "Fairbanks", count: "410" },
  { t: "Wasilla", count: "265" },
  { t: "Juneau", count: "190" },
  { t: "Kenai", count: "145" },
  { t: "Sitka", count: "95" },
];

export default function AlaskaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="AK"
      stateName="Alaska"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Alaska highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Alaska, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={ALASKA_CARRIERS}
      totalCount="2,100"
      dispatchCtaEyebrow="ALASKA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Alaska"
      dispatchCtaBody="We know the barge-to-truck resupply runs out of the Port of Anchorage and the ice-road realities of hauling the Dalton Highway up to Prudhoe Bay. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Anchorage, Fairbanks and Wasilla. We check CDL and MVR before you call."
      basePath="/carriers/alaska"
      searchParams={searchParams}
    />
  );
}
