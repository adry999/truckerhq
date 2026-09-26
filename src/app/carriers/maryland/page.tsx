import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { MARYLAND_CARRIERS } from "@/lib/carriers-maryland";

export const metadata: Metadata = {
  title: "Maryland Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Maryland, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "17,900", small: "Active for-hire carriers" },
  { big: "468", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.9", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Reefer", pct: 18 },
  { t: "Flatbed", pct: 14 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Baltimore", count: "6,240" },
  { t: "Frederick", count: "1,815" },
  { t: "Rockville", count: "1,390" },
  { t: "Gaithersburg", count: "1,205" },
  { t: "Annapolis", count: "890" },
  { t: "Bowie", count: "645" },
];

export default function MarylandCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="MD"
      stateName="Maryland"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Maryland highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Maryland, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={MARYLAND_CARRIERS}
      totalCount="17,900"
      dispatchCtaEyebrow="MARYLAND OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Maryland"
      dispatchCtaBody="We know the container freight moving through the Port of Baltimore and the I-95/I-70 corridor linking DC, Baltimore and the Northeast. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Baltimore, Frederick and Rockville. We check CDL and MVR before you call."
      basePath="/carriers/maryland"
      searchParams={searchParams}
    />
  );
}
