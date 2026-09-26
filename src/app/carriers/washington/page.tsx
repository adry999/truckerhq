import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { WASHINGTON_CARRIERS } from "@/lib/carriers-washington";

export const metadata: Metadata = {
  title: "Washington Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Washington, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "25,700", small: "Active for-hire carriers" },
  { big: "612", small: "New MCs in the last 30 days" },
  { big: "77", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 39 },
  { t: "Reefer", pct: 22 },
  { t: "Flatbed", pct: 15 },
  { t: "Power only", pct: 9 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 4 },
];

const TOP_CITIES = [
  { t: "Seattle", count: "9,240" },
  { t: "Tacoma", count: "4,180" },
  { t: "Spokane", count: "3,615" },
  { t: "Bellevue", count: "2,940" },
  { t: "Everett", count: "2,410" },
  { t: "Vancouver", count: "1,890" },
];

export default function WashingtonCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="WA"
      stateName="Washington"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Washington highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Washington, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={WASHINGTON_CARRIERS}
      totalCount="25,700"
      dispatchCtaEyebrow="WASHINGTON OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Washington"
      dispatchCtaBody="We know the container freight moving through the ports of Seattle and Tacoma and the mountain grades on I-90 east to Spokane. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Seattle, Tacoma and Spokane. We check CDL and MVR before you call."
      basePath="/carriers/washington"
      searchParams={searchParams}
    />
  );
}
