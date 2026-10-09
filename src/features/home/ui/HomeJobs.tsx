import Link from "next/link";
import type { HomeCopy } from "@/features/home/data/home-copy";
import type { HomeJobRow } from "@/features/home/model/home-job-rows";

export function HomeJobs({ c, rows }: { c: HomeCopy; rows: readonly HomeJobRow[] }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.latestJobsHeading}</h2>
        <Link
          href={c.seeAllJobsHref}
          className="flex h-11 items-center font-display text-lg font-bold uppercase tracking-[.04em]"
        >
          {c.seeAllJobsLabel}
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-white">
        {rows.map((j, i) => (
          <Link
            key={j.title + j.company}
            href={j.href}
            className={`flex flex-wrap items-center gap-x-6 gap-y-2.5 px-5 py-[18px] hover:bg-offwhite ${
              i ? "border-t border-[#ECEDEA]" : ""
            }`}
          >
            <div className="flex flex-1 basis-64 flex-col gap-1">
              <div className="text-[17px] font-bold">{j.title}</div>
              <div className="text-sm text-grey">
                {j.company} · {j.loc}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="flex h-7 items-center rounded-md bg-[#E2F0E8] px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-green">
                {j.type}
              </span>
              <span className="flex h-7 items-center rounded-md bg-[#EEEFEC] px-2.5 font-display text-[15px] font-bold tracking-[.06em] text-[#3F444B]">
                {j.equip}
              </span>
            </div>
            <div className="flex basis-36 flex-col items-start gap-0.5">
              <div className="text-[17px] font-bold tabular-nums">{j.pay}</div>
              <div className="text-[13px] text-grey">{j.posted}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
