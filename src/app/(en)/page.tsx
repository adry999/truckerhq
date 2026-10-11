import { languageAlternates } from "@/shared/i18n/alternates";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/shared/seo/structured-data";
import { HOME_COPY, HomePage, homeJobRows } from "@/features/home";
import { JOBS } from "@/features/jobs";

export const metadata: Metadata = buildMetadata({
  title: "Trucker HQ: Flat-Rate Truck Dispatch, CDL Jobs, Carrier Tools",
  description:
    "Truck dispatch for a flat weekly fee, never a percentage. English and Russian-speaking dispatchers 24/7. CDL jobs and free carrier lookup.",
  path: "/",
  ogImage: false,
  languages: languageAlternates("/"),
});

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(HOME_COPY.EN.faq)} />
      <SiteHeader />
      <HomePage lang="EN" jobRows={homeJobRows("EN", JOBS)} />
      <SiteFooter />
    </div>
  );
}
