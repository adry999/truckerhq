import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/shared/seo/structured-data";
import { NEW_MC_FAQ, NewMcChecklist } from "@/features/compliance";

export const metadata: Metadata = buildMetadata({
  title: "New MC Authority Checklist: First 6 Months",
  description:
    "Every filing and setup step for a new trucking authority, from BOC-3 to the new entrant audit.",
  path: "/tools/new-mc-checklist",
  ogImage: false,
});

export default function NewMcChecklistPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(NEW_MC_FAQ)} />
      <SiteHeader />
      <NewMcChecklist />
      <SiteFooter />
    </div>
  );
}
