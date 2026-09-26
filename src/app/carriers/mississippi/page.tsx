import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { MISSISSIPPI_CARRIERS } from "@/lib/carriers-mississippi";

export const metadata: Metadata = {
  title: "Mississippi Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Mississippi, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Flatbed", "Reefer", "Power only"] as const;

const STATS = [
  { big: "12,100", small: "Active for-hire carriers" },
  { big: "318", small: "New MCs in the last 30 days" },
  { big: "71", small: "Average Health Score" },
  { big: "2.5", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 39 },
  { t: "Flatbed", pct: 22 },
  { t: "Reefer", pct: 15 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Jackson", count: "3,240" },
  { t: "Gulfport", count: "1,865" },
  { t: "Southaven", count: "1,410" },
  { t: "Hattiesburg", count: "980" },
  { t: "Biloxi", count: "845" },
  { t: "Meridian", count: "612" },
];

export default function MississippiCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="MS"
      stateName="Mississippi"
      heroImage="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Mississippi highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Mississippi, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={MISSISSIPPI_CARRIERS}
      totalCount="12,100"
      dispatchCtaEyebrow="MISSISSIPPI OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Mississippi"
      dispatchCtaBody="We know the I-55 run through Jackson and the I-20 freight lanes to the east, plus the container and chemical loads out of the Port of Gulfport. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Jackson, Gulfport and Hattiesburg. We check CDL and MVR before you call."
      basePath="/carriers/mississippi"
      searchParams={searchParams}
    />
  );
}
