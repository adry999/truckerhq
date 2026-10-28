import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import { faqSchema, breadcrumbSchema } from "@/shared/seo/structured-data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { RussianSpeakingJobs, RUSSIAN_SPEAKING_COPY } from "@/features/jobs";
import { findCarrier } from "@/features/carriers";

// No `languages` alternates: /ru/jobs is a job board, not an exact translation of this page.
// Indexable like /jobs: the page text is real; the sample listings link to noindex job pages.
export const metadata: Metadata = buildMetadata({
  title: "Russian-Speaking Truck Driver Jobs (CDL-A)",
  description:
    "CDL-A jobs with Russian-speaking recruiters and dispatch. See pay and home time first, apply in English or Russian, and get a call back in your language.",
  path: "/jobs/russian-speaking",
});

export default function RussianSpeakingJobsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(RUSSIAN_SPEAKING_COPY.faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Jobs", path: "/jobs" },
          { name: "Russian-speaking", path: "/jobs/russian-speaking" },
        ])}
      />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <RussianSpeakingJobs carrierScore={(s) => findCarrier(s)?.score} />
      </main>
      <SiteFooter />
    </div>
  );
}
