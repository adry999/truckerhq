import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import GuidesList, { GuidesListView } from "@/features/guides/ui/GuidesList";

export function GuidesIndex() {
  return (
    <>
      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-[18px] px-4 py-10 sm:px-6 md:py-20">
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            Guides for <span className="text-amber">owner-operators</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-on-dark">
            Short, practical answers from our dispatchers: rates, brokers,
            paperwork and starting out. Every guide in English and Russian.
          </p>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-7 sm:px-6 md:pb-20">
        <Suspense fallback={<GuidesListView cat="All" />}>
          <GuidesList />
        </Suspense>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg bg-green p-6 text-offwhite">
            <span className="font-display text-[15px] font-bold tracking-[.14em] text-amber-on-green">
              NEW MC CHECKLIST
            </span>
            <span className="font-display text-2xl font-extrabold uppercase leading-tight">
              17 steps for your first 6 months, with progress saved.
            </span>
            <Button href="/tools/new-mc-checklist" className="mt-1 w-fit">
              Open checklist
            </Button>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border-[1.5px] border-border bg-white p-6">
            <span className="font-display text-[15px] font-bold tracking-[.14em] text-grey">
              PROFIT PER MILE
            </span>
            <span className="font-display text-2xl font-extrabold uppercase leading-tight">
              Put the numbers from the guide into the calculator.
            </span>
            <Link
              href="/tools/profit-per-mile"
              className="mt-1 flex h-12 w-fit items-center rounded-lg bg-asphalt px-6 font-display text-lg font-extrabold uppercase tracking-[.05em] text-offwhite"
            >
              Open calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
