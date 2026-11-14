import { StateHero } from "@/features/carriers/ui/state/StateHero";
import { StateStats } from "@/features/carriers/ui/state/StateStats";
import { StateTopCities } from "@/features/carriers/ui/state/StateTopCities";
import { StateLookupCta } from "@/features/carriers/ui/state/StateLookupCta";
import { StateCtas } from "@/features/carriers/ui/state/StateCtas";

export type StateCarriersViewProps = {
  stateAbbr: string;
  stateName: string;
  heroImage: string;
  heroAlt: string;
  heroDescription: string;
  stats: { big: string; small: string }[];
  topCities: { t: string; count: string }[];
  sourceName: string;
  sourceUrl: string;
  sourceFetchedAt: string;
  dispatchCtaEyebrow: string;
  dispatchCtaTitle: string;
  dispatchCtaBody: string;
  hireCtaBody: string;
};

export function StateCarriersView({
  stateAbbr,
  stateName,
  heroImage,
  heroAlt,
  heroDescription,
  stats,
  topCities,
  sourceName,
  sourceUrl,
  sourceFetchedAt,
  dispatchCtaEyebrow,
  dispatchCtaTitle,
  dispatchCtaBody,
  hireCtaBody,
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
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-2 pt-14 sm:px-6 md:pt-20 lg:grid-cols-2 lg:items-start lg:gap-12">
        <StateTopCities stateName={stateName} topCities={topCities} />
        <StateLookupCta
          stateName={stateName}
          sourceName={sourceName}
          sourceUrl={sourceUrl}
          sourceFetchedAt={sourceFetchedAt}
        />
      </div>
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
