import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import JobsPageContent from "@/components/JobsPageContent";

export const metadata: Metadata = buildMetadata({
  title: "CDL Jobs with Pay Posted Up Front",
  description:
    "OTR, regional and local CDL-A jobs. Every job shows pay, home time and the carrier Health Score. Apply in English or Russian.",
  path: "/jobs",
  languages: { en: "/jobs", ru: "/ru/jobs", "x-default": "/jobs" },
});

export default function JobsPage() {
  return <JobsPageContent lang="EN" />;
}
