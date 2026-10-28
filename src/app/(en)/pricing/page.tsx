import type { Metadata } from "next";
import { PricingPage } from "@/app/_pricing/PricingPage";
import { PRICING_COPY } from "@/app/_pricing/pricing-copy";
import { languageAlternates } from "@/shared/i18n/alternates";
import { buildMetadata } from "@/shared/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: PRICING_COPY.EN.metaTitle,
  description: PRICING_COPY.EN.metaDescription,
  path: "/pricing",
  ogImage: false,
  languages: languageAlternates("/pricing"),
});

export default function Pricing() {
  return <PricingPage lang="EN" />;
}
