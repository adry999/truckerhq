import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/images/home-hero.jpg";
import type { HomeCopy } from "@/features/home/data/home-copy";

export function HomeHero({ c }: { c: HomeCopy }) {
  return (
    <section className="relative flex flex-col overflow-hidden bg-asphalt text-offwhite">
      {/* One image: right side on desktop, 16:9 block under the content below lg (order-2) */}
      <div className="relative order-2 mx-4 mb-14 mt-7 aspect-video overflow-hidden md:aspect-[21/9] rounded-lg sm:mx-6 lg:absolute lg:inset-0 lg:left-[55%] lg:m-0 lg:aspect-auto lg:rounded-none">
        <Image
          src={heroImage}
          alt={c.heroImageAlt}
          fill
          loading="eager"
          fetchPriority="high"
          className="object-cover"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[rgba(22,24,27,.95)] via-[rgba(22,24,27,.75)] to-[rgba(22,24,27,.15)] lg:block" />

      <div className="relative order-1 mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 lg:py-24">
        <div className="flex flex-col gap-6 lg:max-w-[min(36rem,calc(55vw-3.5rem))]">
          <div className="font-display text-base font-bold uppercase tracking-[.12em] text-amber">
            {c.eyebrow}
          </div>
          <h1 className="max-w-3xl text-balance font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            {c.h1}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-on-dark md:text-xl">{c.heroBody}</p>

          <form
            action="/tools/carrier-lookup/search"
            method="get"
            className="mt-2 flex max-w-3xl flex-col gap-1.5 rounded-lg border-[3px] border-amber bg-white p-1.5 sm:flex-row lg:flex-col xl:flex-row"
          >
            <div className="flex min-h-[60px] min-w-0 flex-1 items-center gap-3 px-3.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-asphalt">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                name="q"
                aria-label={c.searchAriaLabel}
                placeholder={c.searchPlaceholder}
                className="min-w-0 flex-1 text-ellipsis border-0 bg-transparent font-sans text-base text-asphalt outline-none sm:text-lg lg:text-base"
              />
            </div>
            <button
              type="submit"
              className="min-h-[60px] rounded-md bg-amber px-8 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              {c.searchButton}
            </button>
          </form>

          <Link
            href="/tools/carrier-lookup"
            className="flex max-w-3xl flex-wrap items-center gap-2 rounded-md border border-white/16 bg-white/7 px-4 py-3 text-offwhite hover:border-amber"
          >
            <span className="text-[13px] text-on-dark-muted">{c.lastCheckedLabel}</span>
            <span className="text-[15px] font-semibold">Carpathian Freight</span>
            <span className="text-sm tabular-nums text-on-dark-soft">{c.carrierStatusLine}</span>
            <span className="ml-auto flex items-center gap-2 text-[13px] text-on-dark-soft">
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-green font-display text-base font-extrabold text-offwhite">86</span>
              Health Score
            </span>
          </Link>
        </div>
      </div>
      <div className="road-line relative order-3 h-1.5" />
    </section>
  );
}
