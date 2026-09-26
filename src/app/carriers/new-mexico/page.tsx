import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { NEW_MEXICO_CARRIERS } from "@/lib/carriers-new-mexico";

export const metadata: Metadata = {
  title: "New Mexico Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in New Mexico, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "10,300", small: "Active for-hire carriers" },
  { big: "268", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 38 },
  { t: "Flatbed", pct: 24 },
  { t: "Power only", pct: 14 },
  { t: "Reefer", pct: 11 },
  { t: "Step deck", pct: 6 },
  { t: "Tanker", pct: 4 },
  { t: "Box truck", pct: 3 },
];

const TOP_CITIES = [
  { t: "Albuquerque", count: "3,940" },
  { t: "Las Cruces", count: "1,610" },
  { t: "Rio Rancho", count: "1,085" },
  { t: "Santa Fe", count: "845" },
  { t: "Farmington", count: "612" },
  { t: "Roswell", count: "498" },
];

export default function NewMexicoCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="NM"
      stateName="New Mexico"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="New Mexico desert highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in New Mexico, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={NEW_MEXICO_CARRIERS}
      totalCount="10,300"
      dispatchCtaEyebrow="NEW MEXICO OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of New Mexico"
      dispatchCtaBody="We know the I-40 run through Albuquerque and the I-25 corridor down to Las Cruces, plus the cross-border freight moving through Santa Teresa and El Paso. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Albuquerque, Las Cruces and Rio Rancho. We check CDL and MVR before you call."
      basePath="/carriers/new-mexico"
      searchParams={searchParams}
    />
  );
}
