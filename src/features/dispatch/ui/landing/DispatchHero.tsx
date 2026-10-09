import { PHONE_HREF } from "@/shared/config/contact";
import Image from "next/image";
import type { DispatchCopy } from "@/features/dispatch/data/dispatch-copy";

export function DispatchHero({ c }: { c: DispatchCopy }) {
  return (
    <section className="relative overflow-hidden bg-asphalt text-offwhite">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1783247007596-cca4a61a16f5?fm=jpg&q=70&w=2000&auto=format&fit=crop"
          alt={c.heroAlt}
          fill
          loading="eager"
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(22,24,27,.94)] via-[rgba(22,24,27,.7)] to-[rgba(22,24,27,.35)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
            {c.h1Line1}
            <br />
            <span className="text-amber">{c.h1Line2}</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-[#D4D6DA] md:text-xl">{c.heroBody}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="flex h-14 items-center rounded-xl bg-amber px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              {c.ctaSeePackages}
            </a>
            <a
              href={PHONE_HREF}
              className="flex h-14 items-center rounded-xl border-2 border-offwhite px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
            >
              {c.ctaCall}
            </a>
          </div>
        </div>
        <div className="justify-self-end w-full max-w-[420px] rounded-[10px] bg-green p-1.5">
          <div className="flex flex-col gap-3.5 rounded-md border-[1.5px] border-white/70 p-6">
            <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber-on-green">
              {c.cardEyebrow}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-8xl font-extrabold">$XXX</span>
              <span className="text-[17px] text-[#DCE6E0]">{c.cardUnit}</span>
            </div>
            <div className="h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_24px,transparent_24px_40px)]" />
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <div className="font-display text-3xl font-extrabold">24/7</div>
                <div className="text-sm text-[#DCE6E0]">{c.statTimezone}</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold">0%</div>
                <div className="text-sm text-[#DCE6E0]">{c.statGross}</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold">EN · RU</div>
                <div className="text-sm text-[#DCE6E0]">{c.statDispatchers}</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold">{c.statNoticeValue}</div>
                <div className="text-sm text-[#DCE6E0]">{c.statNoticeLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="road-line relative h-1.5" />
    </section>
  );
}
