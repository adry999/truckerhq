import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { UTAH_CARRIERS } from "@/lib/carriers-utah";

export const metadata: Metadata = {
  title: "Utah Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Utah, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "15,900", small: "Active for-hire carriers" },
  { big: "410", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Power only", pct: 20 },
  { t: "Reefer", pct: 13 },
  { t: "Flatbed", pct: 12 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 2 },
];

const TOP_CITIES = [
  { t: "Salt Lake City", count: "5,120" },
  { t: "West Valley City", count: "2,340" },
  { t: "Provo", count: "1,890" },
  { t: "West Jordan", count: "1,540" },
  { t: "Orem", count: "1,210" },
  { t: "Ogden", count: "980" },
];

export default function UtahCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="UT"
      stateName="Utah"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Utah highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Utah, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={UTAH_CARRIERS}
      totalCount="15,900"
      dispatchCtaEyebrow="UTAH OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Utah"
      dispatchCtaBody="We know the I-15 corridor from Ogden to Provo and the I-80 freight moving through the Salt Lake City distribution hub, one of the fastest-growing warehouse markets in the Mountain West. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Salt Lake City, Provo and Ogden. We check CDL and MVR before you call."
      basePath="/carriers/utah"
      searchParams={searchParams}
    />
  );
}
