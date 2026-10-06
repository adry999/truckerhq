import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import LegalDocLayout from "@/components/LegalDocLayout";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  path: "/terms",
});

const SECTIONS = [
  {
    heading: "Using the site",
    body: "The free tools are for information only. Check official FMCSA records before making business decisions.",
  },
  {
    heading: "Health Score",
    body: "The Health Score is our summary of public data, not an official FMCSA safety rating.",
  },
  {
    heading: "Dispatch services",
    body: "Dispatch is covered by a separate service agreement signed before the first load.",
  },
  {
    heading: "Job listings",
    body: "Carriers are responsible for the accuracy of the jobs they post.",
  },
  {
    heading: "Limits of liability",
    body: "[To be written by your lawyer.]",
  },
];

const OTHER_DOCS = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "SMS terms", href: "/sms-terms" },
];

export default function TermsPage() {
  return (
    <LegalDocLayout
      title="Terms of use"
      lastUpdated="January 1, 2026"
      sections={SECTIONS}
      otherDocs={OTHER_DOCS}
    />
  );
}
