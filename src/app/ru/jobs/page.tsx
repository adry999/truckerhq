import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import JobsPageContent from "@/components/JobsPageContent";

export const metadata: Metadata = buildMetadata({
  title: "Работа CDL с указанной оплатой",
  description:
    "OTR, региональные и локальные вакансии CDL-A. В каждой вакансии — оплата, время дома и Health Score перевозчика. Отклик на английском или русском.",
  path: "/ru/jobs",
  ogImage: false,
  locale: "ru_RU",
  languages: { en: "/jobs", ru: "/ru/jobs", "x-default": "/jobs" },
});

export default function JobsRuPage() {
  return <JobsPageContent lang="RU" />;
}
