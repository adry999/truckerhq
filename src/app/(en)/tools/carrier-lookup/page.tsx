import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LookupLanding, LookupResults, searchCarriers } from "@/features/carriers";

export const metadata: Metadata = buildMetadata({
  title: "Carrier Lookup by DOT or MC Number",
  description:
    "Check any carrier or broker: authority, insurance, inspections and crashes, summed up in one Health Score.",
  path: "/tools/carrier-lookup",
  ogImage: false,
});

export default async function CarrierLookupPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; mode?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "All";
  const mode = params.mode ?? "All";
  const search = params.q === undefined ? null : await searchCarriers(params.q, status);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      {search ? <LookupResults query={params.q ?? ""} status={status} {...search} /> : <LookupLanding mode={mode} />}
      <SiteFooter />
    </div>
  );
}
