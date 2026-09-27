import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Trucker HQ: диспетчинг, работа CDL и бесплатные инструменты",
  description:
    "Диспетчинг за фиксированную цену в неделю, без процентов. Диспетчеры говорят по-английски и по-русски, 24/7. Работа для CDL и бесплатная проверка перевозчиков.",
  alternates: {
    canonical: "/ru",
    languages: { en: "/", ru: "/ru", "x-default": "/" },
  },
};

export default function HomePageRU() {
  return <HomePageContent lang="RU" />;
}
