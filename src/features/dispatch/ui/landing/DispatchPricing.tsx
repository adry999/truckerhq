import Link from "next/link";
import type { DispatchCopy } from "@/features/dispatch/data/dispatch-copy";

export function DispatchPricing({ c }: { c: DispatchCopy }) {
  return (
    <section id="pricing" className="border-y border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.pricingHeading}</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[#4B5058]">{c.pricingSub}</p>
        </div>
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.packages.map((p) => (
            <div
              key={p.name}
              className={
                p.featured
                  ? "flex rounded-[10px] bg-green p-1.5"
                  : "flex rounded-[10px] border-[1.5px] border-border"
              }
            >
              <div
                className={`flex flex-1 flex-col gap-3.5 rounded-md p-6 ${
                  p.featured ? "border-[1.5px] border-white/70 text-offwhite" : "text-asphalt"
                }`}
              >
                <div className="flex min-h-7 items-center justify-between gap-2">
                  <span
                    className={`font-display text-[15px] font-bold tracking-[.14em] ${
                      p.featured ? "text-amber-on-green" : "text-grey"
                    }`}
                  >
                    {p.who}
                  </span>
                  {p.popular && (
                    <span className="flex h-7 items-center rounded-md bg-amber px-2.5 font-display text-sm font-extrabold tracking-[.08em] text-asphalt">
                      {c.mostPopular}
                    </span>
                  )}
                </div>
                <div className="font-display text-[34px] font-extrabold uppercase leading-[0.95]">{p.name}</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-5xl font-extrabold">$XXX</span>
                  <span className={`text-[15px] ${p.featured ? "text-[#DCE6E0]" : "text-[#4B5058]"}`}>
                    {p.unit}
                  </span>
                </div>
                <div className={`text-[15px] leading-snug ${p.featured ? "text-[#DCE6E0]" : "text-[#4B5058]"}`}>
                  {p.desc}
                </div>
                <div className={`h-px ${p.featured ? "bg-white/25" : "bg-border"}`} />
                <ul className="flex flex-1 flex-col gap-2.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dispatch/start"
                  className={`mt-1.5 flex h-14 items-center justify-center rounded-xl font-display text-xl font-extrabold uppercase tracking-[.05em] ${
                    p.featured
                      ? "bg-amber text-asphalt hover:bg-amber-hover"
                      : "border-2 border-asphalt text-asphalt hover:bg-asphalt hover:text-offwhite"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
