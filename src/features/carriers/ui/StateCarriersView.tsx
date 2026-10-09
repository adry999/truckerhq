import { StateHero } from "@/features/carriers/ui/state/StateHero";
import { StateStats } from "@/features/carriers/ui/state/StateStats";
import { StateBreakdowns } from "@/features/carriers/ui/state/StateBreakdowns";
import { StateCarrierListSection } from "@/features/carriers/ui/state/StateCarrierListSection";
import { StateCtas } from "@/features/carriers/ui/state/StateCtas";
import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export type StateCarriersViewProps = {
  stateAbbr: string;
  stateName: string;
  heroImage: string;
  heroAlt: string;
  heroDescription: string;
  stats: { big: string; small: string }[];
  equipmentBreakdown: { t: string; pct: number }[];
  topCities: { t: string; count: string }[];
  equipmentOptions: readonly string[];
  carriers: StateCarrierRow[];
  totalCount: string;
  dispatchCtaEyebrow: string;
  dispatchCtaTitle: string;
  dispatchCtaBody: string;
  hireCtaBody: string;
  basePath: string;
};

export function StateCarriersView({
  stateAbbr,
  stateName,
  heroImage,
  heroAlt,
  heroDescription,
  stats,
  equipmentBreakdown,
  topCities,
  equipmentOptions,
  carriers,
  totalCount,
  dispatchCtaEyebrow,
  dispatchCtaTitle,
  dispatchCtaBody,
  hireCtaBody,
  basePath,
}: StateCarriersViewProps) {
  return (
    <>
      <StateHero
        stateAbbr={stateAbbr}
        stateName={stateName}
        heroImage={heroImage}
        heroAlt={heroAlt}
        heroDescription={heroDescription}
      />
      <StateStats stats={stats} />
      <StateBreakdowns equipmentBreakdown={equipmentBreakdown} topCities={topCities} />
      <StateCarrierListSection
        stateAbbr={stateAbbr}
        stateName={stateName}
        equipmentOptions={equipmentOptions}
        carriers={carriers}
        totalCount={totalCount}
        basePath={basePath}
      />
      <StateCtas
        stateName={stateName}
        dispatchCtaEyebrow={dispatchCtaEyebrow}
        dispatchCtaTitle={dispatchCtaTitle}
        dispatchCtaBody={dispatchCtaBody}
        hireCtaBody={hireCtaBody}
      />
    </>
  );
}
