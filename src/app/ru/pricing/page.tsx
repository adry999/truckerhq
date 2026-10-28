import type { Metadata } from "next";
import { PricingPage } from "@/app/_pricing/PricingPage";
import { PRICING_COPY } from "@/app/_pricing/pricing-copy";
import { languageAlternates } from "@/shared/i18n/alternates";
import { buildMetadata } from "@/shared/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: PRICING_COPY.RU.metaTitle,
  description: PRICING_COPY.RU.metaDescription,
  path: "/ru/pricing",
  ogImage: false,
  locale: "ru_RU",
  languages: languageAlternates("/pricing"),
});

export default function PricingRu() {
  return <PricingPage lang="RU" />;
}
