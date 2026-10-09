import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ComplianceAlertsForm } from "@/features/compliance";

export const metadata: Metadata = buildMetadata({
  title: "FMCSA Compliance Alerts by Text",
  description:
    "Get a text when your authority, insurance filing, UCR or safety status changes. Free.",
  path: "/tools/compliance-alerts",
  ogImage: false,
});

export default function ComplianceAlertsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:py-16">
          <div className="flex flex-wrap gap-2 text-sm text-[#AEB2B8]">
            <a href="/tools" className="text-offwhite">Tools</a>
            <span>/</span>
            <span>Compliance Alerts</span>
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            Know before the broker does
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            We check your FMCSA record every day. If your authority, insurance
            filing or safety status changes, you get a text the same day.
            Free, in English or Russian.
          </p>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-14">
        <ComplianceAlertsForm />
      </section>

      <SiteFooter />
    </div>
  );
}
