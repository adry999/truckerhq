import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { TEXAS_CARRIERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Texas Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Texas, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "48,210", small: "Active for-hire carriers" },
  { big: "1,284", small: "New MCs in the last 30 days" },
  { big: "76", small: "Average Health Score" },
  { big: "3.1", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 41 },
  { t: "Reefer", pct: 19 },
  { t: "Flatbed", pct: 16 },
  { t: "Power only", pct: 9 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 4 },
];

const TOP_CITIES = [
  { t: "Houston", count: "9,820" },
  { t: "Dallas", count: "7,415" },
  { t: "San Antonio", count: "4,960" },
  { t: "Laredo", count: "3,705" },
  { t: "Fort Worth", count: "3,188" },
  { t: "El Paso", count: "2,634" },
];

export default function TexasCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="TX"
      stateName="Texas"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Texas highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Texas, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={TEXAS_CARRIERS}
      totalCount="48,210"
      dispatchCtaEyebrow="TEXAS OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Texas"
      dispatchCtaBody="We know the Texas triangle, the border freight out of Laredo and the reefer lanes to the Southeast. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Houston, Dallas and San Antonio. We check CDL and MVR before you call."
      basePath="/carriers/texas"
      searchParams={searchParams}
    />
  );
}
