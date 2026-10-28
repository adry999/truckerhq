import type { Metadata } from "next";
import { languageAlternates } from "@/shared/i18n/alternates";
import { buildMetadata } from "@/shared/seo/metadata";
import { ToolsHub } from "@/app/_tools/ToolsHub";

export const metadata: Metadata = buildMetadata({
  title: "Бесплатные инструменты для дальнобойщиков, без регистрации",
  description:
    "Калькулятор прибыли на милю, compliance-алерты и чеклист для нового MC. Поиск перевозчиков по данным FMCSA (на английском).",
  path: "/ru/tools",
  ogImage: false,
  locale: "ru_RU",
  languages: languageAlternates("/tools"),
});

export default function ToolsRuPage() {
  return <ToolsHub lang="RU" />;
}
