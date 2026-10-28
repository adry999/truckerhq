import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LookupSearch, LookupSearchFallback } from "./lookup-search";

// Each ?q= hits the live FMCSA API, so results are never indexed; the
// canonical points at the static landing page.
export const metadata: Metadata = buildMetadata({
  title: "Carrier Search Results",
  description: "Carrier search results from FMCSA public records.",
  path: "/tools/carrier-lookup",
  ogImage: false,
  robots: { index: false, follow: true },
});

const MAX_QUERY_LENGTH = 100;

type Param = string | string[] | undefined;

// A repeated key (?q=a&q=b) arrives as an array; take the first.
function firstParam(value: Param): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CarrierSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: Param; status?: Param }>;
}) {
  const params = await searchParams;
  const status = firstParam(params.status) ?? "All";
  const query = (firstParam(params.q) ?? "").slice(0, MAX_QUERY_LENGTH);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <Suspense key={`${query}|${status}`} fallback={<LookupSearchFallback query={query} />}>
          <LookupSearch query={query} status={status} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
