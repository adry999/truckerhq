import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { WEST_VIRGINIA_CARRIERS } from "@/lib/carriers-west-virginia";

export const metadata: Metadata = {
  title: "West Virginia Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in West Virginia, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Flatbed", "Reefer", "Power only"] as const;

const STATS = [
  { big: "8,300", small: "Active for-hire carriers" },
  { big: "186", small: "New MCs in the last 30 days" },
  { big: "71", small: "Average Health Score" },
  { big: "2.4", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Flatbed", pct: 34 },
  { t: "Dry van", pct: 29 },
  { t: "Reefer", pct: 13 },
  { t: "Power only", pct: 9 },
  { t: "Step deck", pct: 7 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Charleston", count: "1,850" },
  { t: "Huntington", count: "1,320" },
  { t: "Morgantown", count: "980" },
  { t: "Wheeling", count: "760" },
  { t: "Parkersburg", count: "640" },
  { t: "Weirton", count: "410" },
];

export default function WestVirginiaCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="WV"
      stateName="West Virginia"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="West Virginia highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in West Virginia, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={WEST_VIRGINIA_CARRIERS}
      totalCount="8,300"
      dispatchCtaEyebrow="WEST VIRGINIA OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of West Virginia"
      dispatchCtaBody="We know the I-79 run through Morgantown and the I-64 corridor linking Charleston to the coalfields and the Virginia ports. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Charleston, Huntington and Morgantown. We check CDL and MVR before you call."
      basePath="/carriers/west-virginia"
      searchParams={searchParams}
    />
  );
}
