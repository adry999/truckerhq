import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ProfitCalculator } from "@/features/profit";

export const metadata: Metadata = buildMetadata({
  title: "Trucking Profit per Mile Calculator",
  description:
    "Enter the load and your costs. See your real profit and the lowest rate per mile worth taking.",
  path: "/tools/profit-per-mile",
  ogImage: false,
});

export default function ProfitCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:py-16">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 items-center rounded-lg bg-amber px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-asphalt">
              FREE
            </span>
            <span className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
              TRUCKER HQ TOOLS
            </span>
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            Profit per mile
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            Put in the load and your costs. See what you really make, and the
            lowest rate you should take.
          </p>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-14">
        <ProfitCalculator />
      </section>

      <SiteFooter />
    </div>
  );
}
