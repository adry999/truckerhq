import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { DISPATCH_COPY, DispatchCta, DispatchGross, DispatchIncluded, DispatchPricing } from "@/features/dispatch";
import { HireDriversPlans } from "@/features/hire-drivers";
import { getCopy, type Locale } from "@/shared/i18n/locale";
import { breadcrumbSchema, faqSchema } from "@/shared/seo/structured-data";
import { FaqList } from "@/shared/ui/FaqList";
import { PRICING_COPY } from "./pricing-copy";

export function PricingPage({ lang }: { lang: Locale }) {
  const t = getCopy(PRICING_COPY, lang);
  const c = getCopy(DISPATCH_COPY, lang);
  const fallback = t.hireFallback;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Offers/price schema goes in once the prices are real; placeholders must not reach structured data. */}
      <JsonLd data={faqSchema(t.faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: t.breadcrumbHome, path: lang === "RU" ? "/ru" : "/" },
          { name: t.breadcrumbName, path: t.path },
        ])}
      />
      {lang === "RU" ? (
        <SiteHeader lang="RU" enHref="/pricing" ruHref="/ru/pricing" />
      ) : (
        <SiteHeader />
      )}
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <section className="bg-asphalt text-offwhite">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
            <div className="flex flex-col gap-4">
              <span className="flex h-7 w-fit items-center rounded-md bg-amber px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-asphalt">
                {t.badge}
              </span>
              <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
                {t.h1}
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">{t.intro}</p>
            </div>
            <div className="grid grid-cols-3 gap-3.5 rounded-[10px] border-[1.5px] border-white/30 p-6">
              {t.facts.map((f) => (
                <div key={f.label}>
                  <div className="font-display text-3xl font-extrabold text-amber">{f.value}</div>
                  <div className="text-sm text-[#DCE6E0]">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="road-line h-1.5" />
        </section>

        <DispatchPricing c={c} />
        <DispatchIncluded c={c} />
        <DispatchGross c={c} lang={lang} />

        {fallback ? (
          <section className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">{t.hireHeading}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5058]">{t.hireIntro}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {[fallback.jobPost, fallback.full].map((plan) => (
                <div key={plan.name} className="flex flex-col gap-3.5 rounded-[10px] border-[1.5px] border-border bg-white p-6">
                  <div className="font-display text-4xl font-extrabold uppercase">{plan.name}</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-5xl font-extrabold">$XXX</span>
                    <span className="text-[15px] text-[#4B5058]">{plan.unit}</span>
                  </div>
                  <ul className="flex flex-1 flex-col gap-2.5">
                    {plan.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link href={t.hireHref} className="w-fit font-semibold underline underline-offset-4">
              {fallback.link}
            </Link>
          </section>
        ) : (
          <HireDriversPlans postHref={t.hireHref} />
        )}

        <section className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">{t.faqHeading}</h2>
          <FaqList items={t.faq} />
        </section>

        <DispatchCta c={c} />
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
