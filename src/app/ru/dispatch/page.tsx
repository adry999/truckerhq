import type { Metadata } from "next";
import DispatchPageContent from "@/components/DispatchPageContent";

export const metadata: Metadata = {
  title: "Диспетчинг для дальнобойщиков, фиксированная цена в неделю",
  description:
    "Диспетчинг для owner-operator и небольших автопарков. Одна фиксированная цена за грузовик в неделю, диспетчеры 24/7, проверка брокеров, документы включены.",
  alternates: {
    canonical: "/ru/dispatch",
    languages: { en: "/dispatch", ru: "/ru/dispatch", "x-default": "/dispatch" },
  },
};

export default function DispatchRuPage() {
  return <DispatchPageContent lang="RU" />;
}
