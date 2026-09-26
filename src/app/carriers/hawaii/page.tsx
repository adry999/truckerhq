import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { HAWAII_CARRIERS } from "@/lib/carriers-hawaii";

export const metadata: Metadata = {
  title: "Hawaii Carriers — DOT/MC Directory",
  description:
    "Every for-hire carrier based in Hawaii, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Power only", "Flatbed", "Reefer"] as const;

const STATS = [
  { big: "2,600", small: "Active for-hire carriers" },
  { big: "38", small: "New MCs in the last 30 days" },
  { big: "71", small: "Average Health Score" },
  { big: "2.1", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Power only", pct: 22 },
  { t: "Flatbed", pct: 14 },
  { t: "Reefer", pct: 10 },
  { t: "Step deck", pct: 4 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 2 },
];

const TOP_CITIES = [
  { t: "Honolulu", count: "1,340" },
  { t: "Waipahu", count: "320" },
  { t: "Kailua", count: "265" },
  { t: "Pearl City", count: "210" },
  { t: "Kaneohe", count: "185" },
  { t: "Hilo", count: "160" },
];

export default function HawaiiCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="HI"
      stateName="Hawaii"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Container truck on a Hawaii highway near the harbor at dusk"
      heroDescription="Every for-hire carrier based in Hawaii, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={HAWAII_CARRIERS}
      totalCount="2,600"
      dispatchCtaEyebrow="HAWAII OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Hawaii"
      dispatchCtaBody="We know the container drayage out of Honolulu Harbor and the inter-island barge freight that Young Brothers runs between the islands. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Honolulu, Hilo and Kailua. We check CDL and MVR before you call."
      basePath="/carriers/hawaii"
      searchParams={searchParams}
    />
  );
}
