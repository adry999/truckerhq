import { languageAlternates } from "@/shared/i18n/alternates";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/shared/seo/structured-data";
import { NEW_MC_COPY, NewMcChecklist } from "@/features/compliance";

export const metadata: Metadata = buildMetadata({
  title: "Чек-лист нового MC: первые 6 месяцев",
  description:
    "Все шаги и документы для новой trucking-авторизации: от BOC-3 до new entrant safety audit.",
  path: "/ru/tools/new-mc-checklist",
  ogImage: false,
  locale: "ru_RU",
  languages: languageAlternates("/tools/new-mc-checklist"),
});

export default function NewMcChecklistRuPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(NEW_MC_COPY.RU.faq)} />
      <SiteHeader
        lang="RU"
        enHref="/tools/new-mc-checklist"
        ruHref="/ru/tools/new-mc-checklist"
      />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <NewMcChecklist lang="RU" />
      </main>
      <SiteFooter lang="RU" />
    </div>
  );
}
