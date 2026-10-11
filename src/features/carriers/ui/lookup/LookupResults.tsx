import Link from "next/link";
import { CarrierResultRow } from "@/features/carriers/ui/lookup/CarrierResultRow";
import {
  LOOKUP_PATH,
  STATUSES,
  countByStatus,
  dataSourceNote,
  statusHref,
} from "@/features/carriers/model/lookup";
import type { Carrier } from "@/features/carriers/model/carriers.types";

export function LookupResults({
  query,
  status,
  matched,
  shown,
  usingLiveData,
  liveSearchAvailable,
}: {
  query: string;
  status: string;
  matched: Carrier[];
  shown: Carrier[];
  usingLiveData: boolean;
  liveSearchAvailable: boolean;
}) {
  return (
    <>
      <section className="bg-asphalt">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <form
            action={LOOKUP_PATH}
            className="flex max-w-2xl gap-1.5 rounded-lg border-2 border-amber bg-white p-1.5"
          >
            <input
              name="q"
              defaultValue={query}
              aria-label="Search carriers"
              placeholder="DOT, MC or name"
              className="min-h-[50px] flex-1 border-0 bg-transparent px-3.5 font-sans text-[17px] text-asphalt outline-none"
            />
            <button
              type="submit"
              className="min-h-[50px] rounded-[10px] bg-amber px-[22px] font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-8 sm:px-6 md:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <Link
              href={LOOKUP_PATH}
              className="flex min-h-11 w-fit items-center font-display text-[17px] font-bold uppercase tracking-[.04em] text-green"
            >
              ← New search
            </Link>
            <h1 className="font-display text-4xl font-extrabold uppercase md:text-5xl">
              {shown.length} carrier{shown.length === 1 ? "" : "s"}
              {query ? ` for "${query}"` : ""}
            </h1>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STATUSES.map((s) => (
              <Link
                key={s}
                href={statusHref(query, s)}
                className={`flex h-11 items-center gap-2 rounded-[10px] px-3.5 font-display text-base font-extrabold tracking-[.06em] ${
                  status === s
                    ? "border-[1.5px] border-asphalt bg-asphalt text-offwhite"
                    : "border-[1.5px] border-border bg-white text-asphalt"
                }`}
              >
                {s}
                <span className="font-sans text-[13px] font-semibold opacity-75">
                  {countByStatus(matched, s)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <div className="hidden grid-cols-[2.4fr_1fr_1fr_80px_130px_110px] gap-4 bg-asphalt px-5 py-3.5 font-display text-[15px] font-bold tracking-[.1em] text-offwhite md:grid">
            <span>CARRIER</span>
            <span>DOT</span>
            <span>MC</span>
            <span>TRUCKS</span>
            <span>AUTHORITY</span>
            <span className="text-right">HEALTH</span>
          </div>
          {shown.map((c, i) => (
            <CarrierResultRow key={usingLiveData ? c.dot || c.slug : c.slug} carrier={c} index={i} live={usingLiveData} />
          ))}
          {shown.length === 0 && (
            <div className="p-10 text-center text-base text-[#4B5058]">
              No carriers found. Try a DOT number, MC number or part of the
              company name.
            </div>
          )}
        </div>
        <div className="text-[13px] text-grey">
          {dataSourceNote(usingLiveData, liveSearchAvailable)}
        </div>
      </section>
    </>
  );
}
