import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { TENNESSEE_CARRIERS } from "@/lib/carriers-tennessee";

export const metadata: Metadata = {
  title: "Tennessee Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Tennessee, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "28,400", small: "Active for-hire carriers" },
  { big: "705", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.9", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 43 },
  { t: "Power only", pct: 18 },
  { t: "Reefer", pct: 15 },
  { t: "Flatbed", pct: 12 },
  { t: "Step deck", pct: 5 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Memphis", count: "8,940" },
  { t: "Nashville", count: "7,615" },
  { t: "Knoxville", count: "3,280" },
  { t: "Chattanooga", count: "2,745" },
  { t: "Murfreesboro", count: "1,510" },
  { t: "Clarksville", count: "1,185" },
];

export default function TennesseeCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="TN"
      stateName="Tennessee"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Tennessee highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Tennessee, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={TENNESSEE_CARRIERS}
      totalCount="28,400"
      dispatchCtaEyebrow="TENNESSEE OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Tennessee"
      dispatchCtaBody="Memphis is a national logistics super-hub anchored by FedEx's world hub, and I-40, I-24 and I-65 put you within a day's drive of half the country. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Memphis, Nashville and Knoxville. We check CDL and MVR before you call."
      basePath="/carriers/tennessee"
      searchParams={searchParams}
    />
  );
}
