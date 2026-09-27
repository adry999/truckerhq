import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Logo from "@/components/Logo";
import GrossComparison from "@/components/GrossComparison";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";
import { DISPATCH_COPY } from "@/lib/dispatch-copy";

export default function DispatchPageContent({ lang }: { lang: "EN" | "RU" }) {
  const c = DISPATCH_COPY[lang];
  const ru = lang === "RU";

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(c.faq)} />
      {ru ? <SiteHeader lang="RU" enHref="/dispatch" ruHref="/ru/dispatch" /> : <SiteHeader />}

      <section className="relative overflow-hidden bg-asphalt text-offwhite">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1783247007596-cca4a61a16f5?fm=jpg&q=70&w=2000&auto=format&fit=crop"
            alt={c.heroAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(22,24,27,.94)] via-[rgba(22,24,27,.7)] to-[rgba(22,24,27,.35)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
          <div className="flex flex-col gap-5">
            <Logo theme="dark" size={30} sub={c.logoSub} />
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
                href="tel:+1XXXXXXXXXX"
                className="flex h-14 items-center rounded-xl border-2 border-offwhite px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
              >
                {c.ctaCall}
              </a>
            </div>
          </div>
          <div className="justify-self-end w-full max-w-[420px] rounded-[10px] bg-green p-1.5">
            <div className="flex flex-col gap-3.5 rounded-md border-[1.5px] border-white/70 p-6">
              <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
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

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.includedHeading}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.included.map((i) => (
            <div key={i.t} className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-white p-5">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 shrink-0 rounded-sm bg-amber" />
                <span className="font-display text-2xl font-extrabold uppercase leading-tight">{i.t}</span>
              </div>
              <div className="text-[15px] leading-relaxed text-[#4B5058]">{i.d}</div>
            </div>
          ))}
        </div>
      </section>

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
                        p.featured ? "text-amber" : "text-grey"
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

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.stepsHeading}</h2>
        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute left-7 right-7 top-[27px] hidden h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_32px,transparent_32px_52px)] md:block" />
          {c.steps.map((s) => (
            <div key={s.n} className="relative flex flex-col gap-3.5">
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-md bg-asphalt font-display text-3xl font-extrabold text-amber shadow-[0_0_0_6px_var(--color-offwhite)]">
                {s.n}
              </div>
              <div className="font-display text-3xl font-extrabold uppercase">{s.title}</div>
              <div className="max-w-[340px] text-base leading-relaxed text-[#3F444B]">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-9 px-4 py-14 sm:px-6 md:py-24">
          <div className="flex flex-col gap-2">
            <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">{c.grossEyebrow}</div>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.grossHeading}</h2>
          </div>
          {ru ? <GrossComparison lang="RU" /> : <GrossComparison />}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.faqHeading}</h2>
        <div className="flex flex-col border-t-2 border-asphalt">
          {c.faq.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold marker:hidden">
                {f.q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEEFEC] text-xl font-medium group-open:bg-amber">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <div className="pb-5 text-base leading-relaxed text-[#3F444B]">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-5xl rounded-[24px] bg-green p-2">
          <div className="flex flex-wrap items-center justify-between gap-7 rounded-xl border-2 border-white/75 px-6 py-10 text-offwhite sm:px-12 sm:py-14">
            <div className="flex max-w-xl flex-col gap-3">
              <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">{c.ctaEyebrow}</div>
              <h2 className="font-display text-5xl font-extrabold leading-[0.95] md:text-6xl">{c.ctaHeading}</h2>
              <p className="text-lg leading-relaxed text-[#E3EAE6]">{c.ctaBody}</p>
            </div>
            <div className="flex min-w-[280px] flex-col gap-3">
              <Link
                href="/dispatch/start"
                className="flex h-[60px] items-center justify-center rounded-xl bg-amber px-7 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                {c.ctaStart}
              </Link>
              <a
                href="tel:+1XXXXXXXXXX"
                className="flex h-[60px] items-center justify-center rounded-xl border-2 border-offwhite px-6 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
              >
                {c.ctaCall}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
