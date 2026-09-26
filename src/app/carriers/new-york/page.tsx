import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { NEW_YORK_CARRIERS } from "@/lib/carriers-new-york";

export const metadata: Metadata = {
  title: "New York Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in New York, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "42,300", small: "Active for-hire carriers" },
  { big: "968", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 52 },
  { t: "Reefer", pct: 14 },
  { t: "Power only", pct: 12 },
  { t: "Flatbed", pct: 8 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 5 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "New York City", count: "14,850" },
  { t: "Buffalo", count: "4,920" },
  { t: "Rochester", count: "3,110" },
  { t: "Yonkers", count: "2,340" },
  { t: "Syracuse", count: "1,980" },
  { t: "Albany", count: "1,640" },
];

export default function NewYorkCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="NY"
      stateName="New York"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="New York interstate with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in New York, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={NEW_YORK_CARRIERS}
      totalCount="42,300"
      dispatchCtaEyebrow="NEW YORK OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of New York"
      dispatchCtaBody="We know the I-90 Thruway run to Buffalo, the I-87 Northway climb to the Canadian border at Champlain, and the dense metro freight grinding through the five boroughs. One flat price per week."
      hireCtaBody="Post a job and reach drivers in New York City, Buffalo and Rochester. We check CDL and MVR before you call."
      basePath="/carriers/new-york"
      searchParams={searchParams}
    />
  );
}
