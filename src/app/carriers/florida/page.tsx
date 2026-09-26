import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { FLORIDA_CARRIERS } from "@/lib/carriers-florida";

export const metadata: Metadata = {
  title: "Florida Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Florida, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "38,900", small: "Active for-hire carriers" },
  { big: "965", small: "New MCs in the last 30 days" },
  { big: "74", small: "Average Health Score" },
  { big: "2.8", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Reefer", pct: 34 },
  { t: "Dry van", pct: 33 },
  { t: "Flatbed", pct: 14 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 4 },
  { t: "Box truck", pct: 3 },
  { t: "Tanker", pct: 2 },
];

const TOP_CITIES = [
  { t: "Miami", count: "8,140" },
  { t: "Orlando", count: "5,320" },
  { t: "Tampa", count: "4,875" },
  { t: "Jacksonville", count: "3,960" },
  { t: "Fort Lauderdale", count: "2,715" },
  { t: "Lakeland", count: "1,890" },
];

export default function FloridaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="FL"
      stateName="Florida"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Florida highway with a semi truck under palm trees"
      heroDescription="Every for-hire interstate carrier based in Florida, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={FLORIDA_CARRIERS}
      totalCount="38,900"
      dispatchCtaEyebrow="FLORIDA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Florida"
      dispatchCtaBody="We know the I-4 corridor from Tampa to Orlando, the import freight moving out of the Port of Miami and the Central Florida produce lanes running reefer. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Miami, Tampa and Jacksonville. We check CDL and MVR before you call."
      basePath="/carriers/florida"
      searchParams={searchParams}
    />
  );
}
