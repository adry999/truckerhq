import { languageAlternates } from "@/shared/i18n/alternates";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/shared/seo/structured-data";
import { HOME_COPY, HomePage, homeJobRows } from "@/features/home";
import { JOBS } from "@/features/jobs";

export const metadata: Metadata = buildMetadata({
  title: "Trucker HQ: диспетчинг, работа CDL и бесплатные инструменты",
  description:
    "Диспетчинг за фиксированную цену в неделю, без процентов. Диспетчеры говорят по-английски и по-русски, 24/7. Работа для CDL и бесплатная проверка перевозчиков.",
  path: "/ru",
  ogImage: false,
  locale: "ru_RU",
  languages: languageAlternates("/"),
});

export default function HomePageRU() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(HOME_COPY.RU.faq)} />
      <SiteHeader lang="RU" enHref="/" ruHref="/ru" />
      <HomePage lang="RU" jobRows={homeJobRows("RU", JOBS)} />
      <SiteFooter />
    </div>
  );
}
