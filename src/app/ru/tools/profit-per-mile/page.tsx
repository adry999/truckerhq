import type { Metadata } from "next";
import { languageAlternates } from "@/shared/i18n/alternates";
import { buildMetadata } from "@/shared/seo/metadata";
import { faqSchema } from "@/shared/seo/structured-data";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ProfitCalculator, ProfitGuide, profitFaq } from "@/features/profit";

export const metadata: Metadata = buildMetadata({
  title: "Калькулятор прибыли на милю для дальнобойщиков",
  description:
    "Введите груз и свои расходы. Узнайте реальную прибыль и минимальную ставку за милю, которую стоит брать.",
  path: "/ru/tools/profit-per-mile",
  ogImage: false,
  locale: "ru_RU",
  languages: languageAlternates("/tools/profit-per-mile"),
});

export default function ProfitCalculatorRuPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lang="RU" enHref="/tools/profit-per-mile" ruHref="/ru/tools/profit-per-mile" />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <JsonLd data={faqSchema([...profitFaq("RU")])} />

        <section className="bg-asphalt text-offwhite">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:py-16">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 items-center rounded-lg bg-amber px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-asphalt">
                БЕСПЛАТНО
              </span>
              <span className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
                ИНСТРУМЕНТЫ TRUCKER HQ
              </span>
            </div>
            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
              Прибыль на милю
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
              Введите груз и свои расходы. Посмотрите, сколько вы реально зарабатываете, и
              минимальную ставку, которую стоит брать.
            </p>
          </div>
          <div className="road-line h-1.5" />
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-14">
          <ProfitCalculator lang="RU" />
        </section>

        <ProfitGuide lang="RU" />
      </main>
      <SiteFooter lang="RU" />
    </div>
  );
}
