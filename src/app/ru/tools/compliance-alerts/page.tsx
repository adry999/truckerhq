import { languageAlternates } from "@/shared/i18n/alternates";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ComplianceAlertsForm } from "@/features/compliance";

export const metadata: Metadata = buildMetadata({
  title: "Уведомления FMCSA по SMS: авторизация, страховка, UCR",
  description:
    "SMS, когда меняется ваша авторизация, страховая подача (filing), UCR или safety-статус. Бесплатно.",
  path: "/ru/tools/compliance-alerts",
  ogImage: false,
  locale: "ru_RU",
  languages: languageAlternates("/tools/compliance-alerts"),
});

export default function ComplianceAlertsRuPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        lang="RU"
        enHref="/tools/compliance-alerts"
        ruHref="/ru/tools/compliance-alerts"
      />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <section className="bg-asphalt text-offwhite">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:py-16">
            <div className="flex flex-wrap gap-2 text-sm text-[#AEB2B8]">
              <Link href="/ru/tools" className="text-offwhite">Инструменты</Link>
              <span>/</span>
              <span>Уведомления о комплаенсе</span>
            </div>
            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
              Узнайте раньше брокера
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
              Каждый день мы проверяем вашу запись в FMCSA. Если меняется
              авторизация, страховая подача (filing) или safety-статус, вы
              получаете SMS в тот же день. Бесплатно, по-русски или по-английски.
            </p>
          </div>
          <div className="road-line h-1.5" />
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-14">
          <ComplianceAlertsForm lang="RU" />
        </section>
      </main>
      <SiteFooter lang="RU" />
    </div>
  );
}
