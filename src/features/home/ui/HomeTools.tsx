import Link from "next/link";
import type { HomeCopy } from "@/features/home/data/home-copy";

export function HomeTools({ c }: { c: HomeCopy }) {
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-7 px-4 py-12 sm:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 items-center rounded-md bg-asphalt px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-amber">
                {c.toolsFreeBadge}
              </span>
              <span className="font-display text-[15px] font-bold tracking-[.16em] text-grey">
                {c.toolsEyebrowLabel}
              </span>
            </div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">{c.toolsHeading}</h2>
          </div>
          <Link href="/tools" className="flex h-11 items-center font-display text-lg font-bold uppercase tracking-[.04em]">
            {c.allToolsLabel}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.tools.map((t) => (
            <Link
              key={t.name}
              href={t.href}
              className="flex min-h-[190px] flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-offwhite p-5 hover:border-green"
            >
              <div className="font-display text-[28px] font-extrabold uppercase leading-none">{t.name}</div>
              <div className="flex-1 text-[15px] leading-snug text-[#4B5058]">{t.desc}</div>
              {t.hasScore && (
                <span className="flex w-fit items-center gap-1.5 rounded-full border border-border bg-white py-0 pl-1 pr-2.5 text-xs font-semibold text-[#3F444B]">
                  <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-green font-display text-[13px] font-extrabold text-offwhite">
                    86
                  </span>
                  Health Score
                </span>
              )}
              <div className="font-display text-[17px] font-bold uppercase tracking-[.05em] text-green">
                {c.toolOpenLabel}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
