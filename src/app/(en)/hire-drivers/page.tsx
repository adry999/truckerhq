import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";
import { HIRE_FAQ, HireDrivers } from "@/features/hire-drivers";

export const metadata: Metadata = buildMetadata({
  title: "Hire CDL Drivers, Pre-Screened",
  description:
    "Post a driver job. We check CDL, MVR and experience before a driver reaches you. Solo and team drivers.",
  path: "/hire-drivers",
});

export default function HireDriversPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(HIRE_FAQ)} />
      <SiteHeader />
      <HireDrivers />
      <SiteFooter />
    </div>
  );
}
