import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { guidesListSchema } from "@/lib/seo";
import { GUIDES } from "@/lib/guides";
import GuidesList from "@/components/GuidesList";
import GuidesListFromUrl from "@/components/GuidesListFromUrl";

export const metadata: Metadata = buildMetadata({
  title: "Trucking Guides for Owner-Operators",
  description:
    "Practical answers on rates, brokers, paperwork and starting your authority, from our dispatchers.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={guidesListSchema(GUIDES, SITE_URL)} />
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-[18px] px-4 py-10 sm:px-6 md:py-20">
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            Guides for <span className="text-amber">owner-operators</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            Short, practical answers from our dispatchers: rates, brokers,
            paperwork and starting out. Every guide in English and Russian.
          </p>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-7 sm:px-6 md:pb-20">
        <Suspense fallback={<GuidesList cat="All" />}>
          <GuidesListFromUrl />
        </Suspense>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg bg-green p-6 text-offwhite">
            <span className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
              NEW MC CHECKLIST
            </span>
            <span className="font-display text-2xl font-extrabold uppercase leading-tight">
              17 steps for your first 6 months, with progress saved.
            </span>
            <Link
              href="/tools/new-mc-checklist"
              className="mt-1 flex h-12 w-fit items-center rounded-lg bg-amber px-6 font-display text-lg font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              Open checklist
            </Link>
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

      <SiteFooter />
    </div>
  );
}
