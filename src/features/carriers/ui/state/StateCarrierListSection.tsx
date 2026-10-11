import { Suspense } from "react";
import StateCarriersList, { StateCarriersListView } from "@/features/carriers/ui/StateCarriersList";
import { FilterChips, UrlFilterChips } from "@/shared/ui/FilterChips";
import type { StateCarrierRow } from "@/features/carriers/model/carriers.types";

export function StateCarrierListSection({
  stateAbbr,
  stateName,
  equipmentOptions,
  carriers,
  totalCount,
  basePath,
}: {
  stateAbbr: string;
  stateName: string;
  equipmentOptions: readonly string[];
  carriers: StateCarrierRow[];
  totalCount: string;
  basePath: string;
}) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-[18px] px-4 py-8 sm:px-6 md:pb-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-4xl font-extrabold uppercase md:text-5xl">
          {stateName} carrier list
        </h2>
        <Suspense
          fallback={
            <FilterChips
              param="equip"
              options={equipmentOptions}
              current={{}}
              basePath={basePath}
              label="Equipment"
              uppercase
            />
          }
        >
          <UrlFilterChips
            param="equip"
            options={equipmentOptions}
            basePath={basePath}
            label="Equipment"
            uppercase
          />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <StateCarriersListView
            stateAbbr={stateAbbr}
            stateName={stateName}
            carriers={carriers}
            totalCount={totalCount}
            equip="All"
          />
        }
      >
        <StateCarriersList
          stateAbbr={stateAbbr}
          stateName={stateName}
          carriers={carriers}
          totalCount={totalCount}
        />
      </Suspense>
    </section>
  );
}
