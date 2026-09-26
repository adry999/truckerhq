import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClaimProfileWizard from "@/components/ClaimProfileWizard";

export const metadata: Metadata = {
  title: "Claim Your Carrier Profile",
  description: "Verify your company and add your contact details.",
  robots: { index: false, follow: false },
};

export default function ClaimPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pt-10 pb-6 sm:px-6 md:pt-14">
          <div className="flex flex-wrap gap-2 text-sm text-[#AEB2B8]">
            <Link href="/tools/carrier-lookup" className="text-offwhite">
              Carrier Lookup
            </Link>
            <span>/</span>
            <span>Claim profile</span>
          </div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            Claim your carrier profile
          </h1>
        </div>
      </section>

      <ClaimProfileWizard />

      <SiteFooter />
    </div>
  );
}
