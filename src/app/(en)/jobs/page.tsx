import { languageAlternates } from "@/shared/i18n/alternates";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { JobsBoard } from "@/features/jobs";
import { findCarrier } from "@/features/carriers";

export const metadata: Metadata = buildMetadata({
  title: "CDL Jobs with Pay Posted Up Front",
  description:
    "OTR, regional and local CDL-A jobs. Every job shows pay, home time and the carrier Health Score. Apply in English or Russian.",
  path: "/jobs",
  languages: languageAlternates("/jobs"),
});

export default function JobsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <JobsBoard lang="EN" carrierScore={(s) => findCarrier(s)?.score} />
      <SiteFooter />
    </div>
  );
}
