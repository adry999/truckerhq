import Image from "next/image";
import Link from "next/link";
import type { HomeCopy } from "@/features/home/data/home-copy";

export function HomeHero({ c }: { c: HomeCopy }) {
  return (
    <section className="relative overflow-hidden bg-asphalt text-offwhite">
      <div className="absolute inset-0 hidden md:block md:left-[52%]">
        {/* lazy: display:none on mobile skips the fetch; in viewport on desktop so it loads at once */}
        <Image
          src="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
          alt={c.heroImageAlt}
          fill
          loading="lazy"
          fetchPriority="high"
          className="object-cover"
          sizes="48vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[rgba(22,24,27,.95)] via-[rgba(22,24,27,.75)] to-[rgba(22,24,27,.15)] md:block" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:py-24">
        <div className="font-display text-base font-bold uppercase tracking-[.12em] text-amber">
          {c.eyebrow}
        </div>
        <h1 className="max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
          {c.h1}
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA] md:text-xl">{c.heroBody}</p>

        <form
          action="/tools/carrier-lookup"
          method="get"
          className="mt-2 flex max-w-3xl flex-col gap-1.5 rounded-lg border-[3px] border-amber bg-white p-1.5 sm:flex-row"
        >
          <div className="flex min-h-[60px] flex-1 items-center gap-3 px-3.5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-asphalt">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              name="q"
              aria-label={c.searchAriaLabel}
              placeholder={c.searchPlaceholder}
              className="min-w-0 flex-1 border-0 bg-transparent font-sans text-lg text-asphalt outline-none"
            />
          </div>
          <button
            type="submit"
            className="min-h-[60px] rounded px-8 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt"
            style={{ background: "var(--color-amber)" }}
          >
            {c.searchButton}
          </button>
        </form>

        <Link
          href="/tools/carrier-lookup"
          className="flex max-w-3xl flex-wrap items-center gap-2 rounded-md border border-white/16 bg-white/7 px-4 py-3 text-offwhite hover:border-amber"
        >
          <span className="text-[13px] text-[#AEB2B8]">{c.lastCheckedLabel}</span>
          <span className="text-[15px] font-semibold">Carpathian Freight</span>
          <span className="text-sm tabular-nums text-[#C9CBCF]">{c.carrierStatusLine}</span>
          <span className="ml-auto flex items-center gap-2 text-[13px] text-[#C9CBCF]">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-green font-display text-base font-extrabold text-offwhite">
              86
            </span>
            Health Score
          </span>
        </Link>

        <div className="relative mt-1.5 aspect-video overflow-hidden rounded-lg md:hidden">
          <Image
            src="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
            alt={c.heroImageAlt}
            fill
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
      <div className="road-line relative h-1.5" />
    </section>
  );
}
