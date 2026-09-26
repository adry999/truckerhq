import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { LOUISIANA_CARRIERS } from "@/lib/carriers-louisiana";

export const metadata: Metadata = {
  title: "Louisiana Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Louisiana, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Flatbed", "Power only", "Reefer"] as const;

const STATS = [
  { big: "18,900", small: "Active for-hire carriers" },
  { big: "486", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 38 },
  { t: "Flatbed", pct: 22 },
  { t: "Power only", pct: 16 },
  { t: "Reefer", pct: 12 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "New Orleans", count: "5,620" },
  { t: "Baton Rouge", count: "3,840" },
  { t: "Shreveport", count: "2,210" },
  { t: "Lafayette", count: "1,980" },
  { t: "Lake Charles", count: "1,540" },
  { t: "Metairie", count: "1,290" },
];

export default function LouisianaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="LA"
      stateName="Louisiana"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Louisiana highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Louisiana, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={LOUISIANA_CARRIERS}
      totalCount="18,900"
      dispatchCtaEyebrow="LOUISIANA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Louisiana"
      dispatchCtaBody="We know the container freight moving through the Port of New Orleans and the tank and flatbed loads running the petrochemical corridor along I-10. One flat price per week."
      hireCtaBody="Post a job and reach drivers in New Orleans, Baton Rouge and Lafayette. We check CDL and MVR before you call."
      basePath="/carriers/louisiana"
      searchParams={searchParams}
    />
  );
}
