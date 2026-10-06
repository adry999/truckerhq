import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import DispatchPageContent from "@/components/DispatchPageContent";

export const metadata: Metadata = buildMetadata({
  title: "Диспетчинг для дальнобойщиков, фиксированная цена в неделю",
  description:
    "Диспетчинг для owner-operator и небольших автопарков. Одна фиксированная цена за грузовик в неделю, диспетчеры 24/7, проверка брокеров, документы включены.",
  path: "/ru/dispatch",
  locale: "ru_RU",
  languages: { en: "/dispatch", ru: "/ru/dispatch", "x-default": "/dispatch" },
});

export default function DispatchRuPage() {
  return <DispatchPageContent lang="RU" />;
}
