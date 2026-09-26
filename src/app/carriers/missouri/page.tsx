import type { Metadata } from "next";
import StateCarriersPage from "@/components/StateCarriersPage";
import { MISSOURI_CARRIERS } from "@/lib/carriers-missouri";

export const metadata: Metadata = {
  title: "Missouri Carriers — DOT/MC Directory",
  description:
    "Every for-hire interstate carrier based in Missouri, from public FMCSA data. Search DOT and MC numbers, filter by equipment and check any carrier's Health Score.",
};

const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

const STATS = [
  { big: "24,900", small: "Active for-hire carriers" },
  { big: "615", small: "New MCs in the last 30 days" },
  { big: "75", small: "Average Health Score" },
  { big: "2.9", small: "Trucks per carrier, average" },
];

const EQUIP_STATS = [
  { t: "Dry van", pct: 44 },
  { t: "Reefer", pct: 16 },
  { t: "Flatbed", pct: 15 },
  { t: "Power only", pct: 9 },
  { t: "Step deck", pct: 6 },
  { t: "Box truck", pct: 6 },
  { t: "Tanker", pct: 4 },
];

const TOP_CITIES = [
  { t: "Kansas City", count: "8,240" },
  { t: "St. Louis", count: "7,910" },
  { t: "Springfield", count: "2,340" },
  { t: "Columbia", count: "1,480" },
  { t: "Independence", count: "1,120" },
  { t: "Lee's Summit", count: "890" },
];

export default function MissouriCarriersPage({
  searchParams,
}: {
  searchParams: Promise<{ equip?: string }>;
}) {
  return (
    <StateCarriersPage
      stateAbbr="MO"
      stateName="Missouri"
      heroImage="https://images.unsplash.com/photo-1779583074717-e60fa13131ce?fm=jpg&q=70&w=2000&auto=format&fit=crop"
      heroAlt="Missouri highway with a semi truck at dusk"
      heroDescription="Every for-hire interstate carrier based in Missouri, from public FMCSA data. Search, filter and check any Health Score."
      stats={STATS}
      equipmentBreakdown={EQUIP_STATS}
      topCities={TOP_CITIES}
      equipmentOptions={EQUIPMENT}
      carriers={MISSOURI_CARRIERS}
      totalCount="24,900"
      dispatchCtaEyebrow="MISSOURI OWNER-OPERATOR?"
      dispatchCtaTitle="Flat dispatch out of Missouri"
      dispatchCtaBody="We know the I-70 run linking Kansas City to St. Louis and the I-44 corridor down through Springfield, the crossroads where the interstates that connect the whole country come together. One flat price per week."
      hireCtaBody="Post a job and reach drivers in Kansas City, St. Louis and Springfield. We check CDL and MVR before you call."
      basePath="/carriers/missouri"
      searchParams={searchParams}
    />
  );
}
