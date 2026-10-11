import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import { SITE_URL } from "@/shared/config/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { guidesListSchema } from "@/shared/seo/structured-data";
import { GUIDES, GuidesIndex } from "@/features/guides";

export const metadata: Metadata = buildMetadata({
  title: "Trucking Guides for Owner-Operators",
  description:
    "Practical answers on rates, brokers, paperwork and starting your authority, from our dispatchers.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={guidesListSchema(GUIDES, SITE_URL)} />
      <SiteHeader />
      <GuidesIndex />
      <SiteFooter />
    </div>
  );
}
