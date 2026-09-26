import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { IDAHO_CARRIERS } from "@/lib/carriers-idaho";

export const metadata: Metadata = {
  title: "Idaho Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Idaho, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "8,700", small: "Active for-hire carriers" },
  { big: "215", small: "New MCs in the last 30 days" },
  { big: "77", small: "Average Health Score" },
  { big: "2.4", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Reefer", pct: 34 },
  { t: "Flatbed", pct: 26 },
  { t: "Dry van", pct: 22 },
  { t: "Power only", pct: 8 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 3 },
  { t: "Tanker", pct: 2 },
];

const TOP_CITIES = [
  { t: "Boise", count: "2,940" },
  { t: "Meridian", count: "1,410" },
  { t: "Nampa", count: "1,185" },
  { t: "Idaho Falls", count: "980" },
  { t: "Pocatello", count: "760" },
  { t: "Coeur d'Alene", count: "615" },
];

export default function IdahoCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="ID"
      stateName="Idaho"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Idaho highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Idaho, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={IDAHO_CARRIERS}
      totalCount="8,700"
      dispatchCtaEyebrow="IDAHO OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Idaho"
      dispatchCtaBody="We know the I-84 run through the Treasure Valley and the I-15 corridor up to Idaho Falls, plus the reefer freight hauling potatoes and ag product out of the Magic Valley. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Boise, Meridian and Idaho Falls. We check CDL and MVR before you call."
      basePath="/carriers/idaho"
      searchParams={searchParams}
    />
  );
}
