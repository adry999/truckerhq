import { languageAlternates } from "@/shared/i18n/alternates";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { dispatchServiceSchema, faqSchema } from "@/shared/seo/structured-data";
import { DISPATCH_COPY, DispatchPage } from "@/features/dispatch";

export const metadata: Metadata = buildMetadata({
  title: "Truck Dispatch Service, Flat Weekly Rate",
  description:
    "Dispatch for owner-operators and small fleets. One flat price per truck per week, 24/7 dispatchers, broker checks, paperwork included.",
  path: "/dispatch",
  ogImage: false,
  languages: languageAlternates("/dispatch"),
});

export default function Dispatch() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={dispatchServiceSchema()} />
      <JsonLd data={faqSchema(DISPATCH_COPY.EN.faq)} />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <DispatchPage lang="EN" />
      </main>
      <SiteFooter />
    </div>
  );
}
