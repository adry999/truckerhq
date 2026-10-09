import { languageAlternates } from "@/shared/i18n/alternates";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/shared/seo/structured-data";
import { DISPATCH_COPY, DispatchPage } from "@/features/dispatch";

export const metadata: Metadata = buildMetadata({
  title: "Диспетчинг для дальнобойщиков, фиксированная цена в неделю",
  description:
    "Диспетчинг для owner-operator и небольших автопарков. Одна фиксированная цена за грузовик в неделю, диспетчеры 24/7, проверка брокеров, документы включены.",
  path: "/ru/dispatch",
  ogImage: false,
  locale: "ru_RU",
  languages: languageAlternates("/dispatch"),
});

export default function DispatchRuPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(DISPATCH_COPY.RU.faq)} />
      <SiteHeader lang="RU" enHref="/dispatch" ruHref="/ru/dispatch" />
      <DispatchPage lang="RU" />
      <SiteFooter />
    </div>
  );
}
