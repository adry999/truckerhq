import type { Metadata } from "next";
import JobsPageContent from "@/components/JobsPageContent";

export const metadata: Metadata = {
  title: "Работа CDL с указанной оплатой",
  description:
    "OTR, региональные и локальные вакансии CDL-A. В каждой вакансии — оплата, время дома и Health Score перевозчика. Отклик на английском или русском.",
  alternates: {
    canonical: "/ru/jobs",
    languages: { en: "/jobs", ru: "/ru/jobs", "x-default": "/jobs" },
  },
};

export default async function JobsRuPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; equip?: string; q?: string }>;
}) {
  const params = await searchParams;
  return (
    <JobsPageContent
      lang="RU"
      type={params.type ?? "All"}
      equip={params.equip ?? "All"}
      q={(params.q ?? "").trim().toLowerCase()}
    />
  );
}
