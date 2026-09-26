import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { GEORGIA_CARRIERS } from "@/lib/carriers-georgia";

export const metadata: Metadata = {
  title: "Georgia Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Georgia, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "29,800", small: "Active for-hire carriers" },
  { big: "742", small: "New MCs in the last 30 days" },
  { big: "74", small: "Average Health Score" },
  { big: "2.8", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 46 },
  { t: "Reefer", pct: 17 },
  { t: "Flatbed", pct: 14 },
  { t: "Power only", pct: 8 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Atlanta", count: "11,340" },
  { t: "Savannah", count: "4,215" },
  { t: "Augusta", count: "2,180" },
  { t: "Macon", count: "1,760" },
  { t: "Columbus", count: "1,425" },
  { t: "Marietta", count: "1,190" },
];

export default function GeorgiaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="GA"
      stateName="Georgia"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Georgia highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Georgia, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={GEORGIA_CARRIERS}
      totalCount="29,800"
      dispatchCtaEyebrow="GEORGIA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Georgia"
      dispatchCtaBody="We know the I-75/I-85 corridor through Atlanta and the container freight coming out of the Port of Savannah, the Southeast's busiest distribution hub. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Atlanta, Savannah and Augusta. We check CDL and MVR before you call."
      basePath="/carriers/georgia"
      searchParams={searchParams}
    />
  );
}
