import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { DispatchStartWizard } from "@/features/dispatch";

export const metadata: Metadata = buildMetadata({
  title: "Start Dispatch",
  description:
    "Tell us about your truck and lanes. A dispatcher calls you back.",
  path: "/dispatch/start",
  robots: { index: false, follow: false },
});

export default function DispatchStartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            Start dispatch
          </h1>
        </div>
      </section>

      <DispatchStartWizard />

      <SiteFooter />
    </div>
  );
}
