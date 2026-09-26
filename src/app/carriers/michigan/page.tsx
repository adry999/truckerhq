import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { MICHIGAN_CARRIERS } from "@/lib/carriers-michigan";

export const metadata: Metadata = {
  title: "Michigan Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Michigan, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Flatbed", "Reefer", "Power only"] as const;

const STATS = [
  { big: "27,600", small: "Active for-hire carriers" },
  { big: "648", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 39 },
  { t: "Flatbed", pct: 21 },
  { t: "Reefer", pct: 14 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 7 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 4 },
];

const TOP_CITIES = [
  { t: "Detroit", count: "8,240" },
  { t: "Grand Rapids", count: "3,915" },
  { t: "Warren", count: "2,470" },
  { t: "Sterling Heights", count: "1,890" },
  { t: "Lansing", count: "1,530" },
  { t: "Ann Arbor", count: "1,205" },
];

export default function MichiganCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="MI"
      stateName="Michigan"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Michigan highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Michigan, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={MICHIGAN_CARRIERS}
      totalCount="27,600"
      dispatchCtaEyebrow="MICHIGAN OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Michigan"
      dispatchCtaBody="We know the automotive freight running I-94 and I-75 between Detroit, Warren and Sterling Heights, and the cross-border loads through the Ambassador Bridge at Detroit-Windsor, the busiest freight crossing in North America. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Detroit, Grand Rapids and Lansing. We check CDL and MVR before you call."
      basePath="/carriers/michigan"
      searchParams={searchParams}
    />
  );
}
