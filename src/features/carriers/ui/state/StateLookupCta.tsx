import Link from "next/link";
import { formatCensusDate } from "@/features/carriers/model/state-content";

export function StateLookupCta({
  stateName,
  sourceName,
  sourceUrl,
  sourceFetchedAt,
}: {
  stateName: string;
  sourceName: string;
  sourceUrl: string;
  sourceFetchedAt: string;
}) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 md:pb-10">
      <h2 className="font-display text-4xl font-extrabold uppercase md:text-5xl">
        Check a {stateName} carrier
      </h2>
      <p className="max-w-2xl text-lg leading-relaxed text-[#3F444B]">
        Have a DOT or MC number? Look it up to see authority, insurance, safety record and the
        Health Score before you book a load. Starting your own authority? Our new-MC checklist
        walks through the steps.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/tools/carrier-lookup"
          className="flex h-14 items-center rounded-xl bg-amber px-[26px] font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
        >
          Carrier lookup
        </Link>
        <Link
          href="/tools/new-mc-checklist"
          className="flex h-14 items-center rounded-xl border-2 border-asphalt px-[26px] font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-asphalt hover:text-offwhite"
        >
          New MC checklist
        </Link>
      </div>
      <p className="text-sm text-grey">
        Source:{" "}
        <a href={sourceUrl} className="underline" rel="noopener noreferrer">
          {sourceName}
        </a>
        , data as of {formatCensusDate(sourceFetchedAt)}. Counts cover active interstate carriers
        authorized for hire with a physical address in {stateName}.
      </p>
    </section>
  );
}
