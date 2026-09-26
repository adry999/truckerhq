import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { SOUTH_CAROLINA_CARRIERS } from "@/lib/carriers-south-carolina";

export const metadata: Metadata = {
  title: "South Carolina Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in South Carolina, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "17,200", small: "Active for-hire carriers" },
  { big: "428", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "3.4", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Reefer", pct: 18 },
  { t: "Flatbed", pct: 15 },
  { t: "Power only", pct: 9 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Columbia", count: "4,890" },
  { t: "Charleston", count: "3,715" },
  { t: "North Charleston", count: "2,940" },
  { t: "Greenville", count: "2,410" },
  { t: "Rock Hill", count: "1,325" },
  { t: "Mount Pleasant", count: "980" },
];

export default function SouthCarolinaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="SC"
      stateName="South Carolina"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="South Carolina highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in South Carolina, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={SOUTH_CAROLINA_CARRIERS}
      totalCount="17,200"
      dispatchCtaEyebrow="SOUTH CAROLINA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of South Carolina"
      dispatchCtaBody="We know the container freight rolling out of the Port of Charleston and the I-26/I-95 corridor linking the Lowcountry to the rest of the Southeast. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Columbia, Charleston and Greenville. We check CDL and MVR before you call."
      basePath="/carriers/south-carolina"
      searchParams={searchParams}
    />
  );
}
