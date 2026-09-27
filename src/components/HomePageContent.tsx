import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";
import { HOME_COPY } from "@/lib/home-copy";

export default function HomePageContent({ lang }: { lang: "EN" | "RU" }) {
  const c = HOME_COPY[lang];
  const ru = lang === "RU";

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(c.faq)} />
      {ru ? <SiteHeader lang="RU" enHref="/" ruHref="/ru" /> : <SiteHeader />}

      <section className="relative overflow-hidden bg-asphalt text-offwhite">
        <div className="absolute inset-0 hidden md:block md:left-[52%]">
          <Image
            src="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=2000&auto=format&fit=crop"
            alt={c.heroImageAlt}
            fill
            priority
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
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="road-line relative h-1.5" />
      </section>

      <section className="border-b border-border bg-offwhite">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-4 px-4 py-5 sm:px-6 md:grid-cols-4">
          {c.facts.map((f) => (
            <div key={f.k} className="flex flex-col gap-0.5">
              <span className="text-[13px] text-grey">{f.k}</span>
              <span className="text-base font-semibold">{f.v}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.dispatchHeading}</h2>
        <div className="grid gap-4 md:grid-cols-[1.35fr_1fr]">
          <div className="row-span-2 flex flex-col overflow-hidden rounded-lg bg-green text-offwhite">
            <div className="relative h-[220px]">
              <Image
                src="https://images.unsplash.com/photo-1631914730551-1cfbcdf6f603?fm=jpg&q=70&w=2000&auto=format&fit=crop"
                alt={ru ? "Диспетчерская Trucker HQ" : "Trucker HQ dispatch office"}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-7">
              <div className="font-display text-5xl font-extrabold uppercase leading-[0.95]">
                {c.dispatchCardTitle}
              </div>
              <div className="max-w-md text-lg font-medium leading-snug">{c.dispatchCardBody}</div>
              <ul className="grid flex-1 grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2">
                {c.dispatchItems.map((it) => (
                  <li key={it} className="flex gap-2.5 text-[15px] leading-snug text-[#E3EAE6]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F2A900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {it}
                  </li>
                ))}
              </ul>
              <Link
                href={c.dispatchCardCtaHref}
                className="mt-2 flex h-14 w-fit items-center rounded-[10px] bg-amber px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                {c.dispatchCardCtaLabel}
              </Link>
            </div>
          </div>
          {c.smallServices.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="flex flex-col gap-3 rounded-lg border-[1.5px] border-border bg-white p-6 hover:border-green"
            >
              <div className="font-display text-3xl font-extrabold uppercase leading-[0.95]">{s.title}</div>
              <div className="flex-1 text-base leading-relaxed text-[#3F444B]">{s.line}</div>
              <div className="flex items-center gap-2 font-display text-lg font-extrabold uppercase tracking-[.05em] text-green">
                {s.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
                href="tel:+1XXXXXXXXXX"
                className="flex h-14 items-center rounded-xl border-2 border-offwhite px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
              >
                {c.callLabel}
              </a>
            </div>
          </div>
          <div className="rounded-[10px] bg-green p-1.5">
            <div className="flex flex-col gap-[18px] rounded-md border-[1.5px] border-white/70 p-6">
              <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber">{c.exampleEyebrow}</div>
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
          {c.jobs.map((j, i) => (
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

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
        <div className="flex max-w-xl flex-col gap-2.5">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.teamHeading}</h2>
          <p className="text-lg leading-relaxed text-[#3F444B]">{c.teamBody}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {c.team.map((p) => (
            <div key={p.name + p.note} className="flex flex-col gap-3">
              <div className="aspect-[4/5] rounded-lg bg-border" />
              <div className="flex flex-col gap-0.5">
                <span className="text-lg font-bold">{p.name}</span>
                <span className="text-[15px] text-[#4B5058]">{p.role}</span>
                <span className="text-sm text-grey">{p.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">{c.quotesHeading}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.quotes.map((q) => (
              <figure key={q.name} className="flex flex-col gap-5 rounded-lg border-[1.5px] border-border bg-offwhite p-6">
                <div className="h-1.5 w-10 rounded-sm bg-amber" />
                <blockquote className="flex-1 text-lg leading-relaxed">
                  {c.quoteOpen}
                  {q.text}
                  {c.quoteClose}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-border" />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-[15px] font-bold">{q.name}</span>
                    <span className="text-sm text-grey">{q.role}</span>
                  </div>
                  <span className="flex h-[26px] items-center rounded-md border border-[#9CA0A8] px-2 font-display text-sm font-extrabold tracking-[.06em] text-[#3F444B]">
                    {q.lang}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
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

      <SiteFooter />
    </div>
  );
}
