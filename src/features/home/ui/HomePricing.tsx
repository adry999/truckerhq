import { PHONE_HREF } from "@/shared/config/contact";
import { ButtonRow } from "@/shared/ui/ButtonRow";
import { Button, buttonClass } from "@/shared/ui/Button";
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
            <span className="text-lg text-on-dark-soft">{c.pricingUnit}</span>
          </div>
          <p className="max-w-lg text-lg leading-relaxed text-on-dark">{c.pricingBody}</p>
          <ButtonRow className="mt-2">
            <Button href={c.pricingCtaHref} size="lg">
              {c.pricingCtaLabel}
            </Button>
            <a href={PHONE_HREF} className={buttonClass({ variant: "outlineLight", size: "lg" })}>
              {c.callLabel}
            </a>
          </ButtonRow>
        </div>
        <div className="rounded-[10px] bg-green p-1.5 md:self-start">
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
            <div className="text-sm leading-relaxed text-on-green-muted">{c.exampleFooter}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
