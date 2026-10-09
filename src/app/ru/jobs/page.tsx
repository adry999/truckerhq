import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { JobsBoard } from "@/features/jobs";
import { findCarrier } from "@/lib/data";

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
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lang="RU" enHref="/jobs" ruHref="/ru/jobs" />
      <JobsBoard lang="RU" carrierScore={(s) => findCarrier(s)?.score} />
      <SiteFooter />
    </div>
  );
}
