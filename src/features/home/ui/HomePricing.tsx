import { PHONE_HREF } from "@/shared/config/contact";
import Link from "next/link";
import type { HomeCopy } from "@/features/home/data/home-copy";

export function HomePricing({ c }: { c: HomeCopy }) {
  return (
    <section className="bg-asphalt text-offwhite">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
        <div className="flex flex-col gap-5">
          <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">{c.pricingEyebrow}</div>
          <h2 className="font-display text-4xl font-extrabold leading-[0.95] md:text-6xl">
            {c.pricingHeadingLine1}
            <br />
            {c.pricingHeadingLine2}
          </h2>
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-6xl font-extrabold text-amber md:text-8xl">$XXX</span>
            <span className="text-lg text-[#C9CBCF]">{c.pricingUnit}</span>
          </div>
          <p className="max-w-lg text-lg leading-relaxed text-[#D4D6DA]">{c.pricingBody}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href={c.pricingCtaHref}
              className="flex h-14 items-center rounded-xl bg-amber px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              {c.pricingCtaLabel}
            </Link>
            <a
              href={PHONE_HREF}
              className="flex h-14 items-center rounded-xl border-2 border-offwhite px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
            >
              {c.callLabel}
            </a>
          </div>
        </div>
        <div className="rounded-[10px] bg-green p-1.5">
          <div className="flex flex-col gap-[18px] rounded-md border-[1.5px] border-white/70 p-6">
            <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber-on-green">{c.exampleEyebrow}</div>
            <div className="flex items-baseline justify-between gap-3 border-b border-white/25 pb-4">
              <span className="text-base">{c.example10Label}</span>
              <span className="font-display text-4xl font-extrabold tabular-nums">$800</span>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-white/25 pb-4">
              <span className="text-base">{c.example8Label}</span>
              <span className="font-display text-4xl font-extrabold tabular-nums">$640</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-base font-bold">Trucker HQ</span>
              <span className="font-display text-4xl font-extrabold text-amber">$XXX</span>
            </div>
            <div className="text-sm leading-relaxed text-[#DCE6E0]">{c.exampleFooter}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
