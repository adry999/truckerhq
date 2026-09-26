import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { NEW_HAMPSHIRE_CARRIERS } from "@/lib/carriers-new-hampshire";

export const metadata: Metadata = {
  title: "New Hampshire Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in New Hampshire, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Power only"] as const;

const STATS = [
  { big: "6,900", small: "Active for-hire carriers" },
  { big: "184", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.6", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 52 },
  { t: "Reefer", pct: 15 },
  { t: "Power only", pct: 12 },
  { t: "Flatbed", pct: 8 },
  { t: "Box truck", pct: 6 },
  { t: "Step deck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Manchester", count: "1,850" },
  { t: "Nashua", count: "1,320" },
  { t: "Concord", count: "890" },
  { t: "Derry", count: "540" },
  { t: "Dover", count: "415" },
  { t: "Rochester", count: "310" },
];

export default function NewHampshireCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="NH"
      stateName="New Hampshire"
      heroImage="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="New Hampshire highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in New Hampshire, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={NEW_HAMPSHIRE_CARRIERS}
      totalCount="6,900"
      dispatchCtaEyebrow="NEW HAMPSHIRE OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of New Hampshire"
      dispatchCtaBody="We know the I-93 run down to Boston and the I-95 lanes through the Seacoast, plus the distribution centers that stack up near Nashua and Salem to dodge the state's no sales tax border. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Manchester, Nashua and Concord. We check CDL and MVR before you call."
      basePath="/carriers/new-hampshire"
      searchParams={searchParams}
    />
  );
}
