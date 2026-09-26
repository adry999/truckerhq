import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { MAINE_CARRIERS } from "@/lib/carriers-maine";

export const metadata: Metadata = {
  title: "Maine Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Maine, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "7,820", small: "Active for-hire carriers" },
  { big: "184", small: "New MCs in the last 30 days" },
  { big: "73", small: "Average Health Score" },
  { big: "2.4", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 38 },
  { t: "Reefer", pct: 24 },
  { t: "Flatbed", pct: 15 },
  { t: "Power only", pct: 10 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 4 },
  { t: "Tanker", pct: 3 },
];

const TOP_CITIES = [
  { t: "Portland", count: "1,410" },
  { t: "Bangor", count: "845" },
  { t: "Lewiston", count: "610" },
  { t: "South Portland", count: "520" },
  { t: "Auburn", count: "385" },
  { t: "Biddeford", count: "340" },
];

export default function MaineCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="ME"
      stateName="Maine"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Maine highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Maine, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={MAINE_CARRIERS}
      totalCount="7,820"
      dispatchCtaEyebrow="MAINE OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Maine"
      dispatchCtaBody="We run I-95 from Kittery to Houlton and know the seafood reefer loads out of Portland and the paper-mill freight out of the North Woods. Border crossings into Canada at Calais and Houlton are second nature — one flat price per week."
      hireCtaBody="Post a job and reach drivers in Portland, Bangor and Lewiston. We check CDL and MVR before you call."
      basePath="/carriers/maine"
      searchParams={searchParams}
    />
  );
}
