import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import { faqSchema } from "@/shared/seo/structured-data";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LOOKUP_FAQ, LookupLanding } from "@/features/carriers";

export const metadata: Metadata = buildMetadata({
  title: "Carrier Lookup by DOT or MC Number",
  description:
    "Check any carrier or broker: authority, insurance, inspections and crashes, summed up in one Health Score.",
  path: "/tools/carrier-lookup",
  ogImage: false,
});

// Static on purpose: reads no request data, so the CDN can cache the page.
// Searches go to /tools/carrier-lookup/search, which is dynamic.
export default function CarrierLookupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <JsonLd data={faqSchema([...LOOKUP_FAQ])} />
        <LookupLanding />
      </main>
      <SiteFooter />
    </div>
  );
}
