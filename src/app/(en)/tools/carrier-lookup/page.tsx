import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LookupLanding } from "@/features/carriers";
import { LookupSearch, LookupSearchFallback } from "./lookup-search";

export const metadata: Metadata = buildMetadata({
  title: "Carrier Lookup by DOT or MC Number",
  description:
    "Check any carrier or broker: authority, insurance, inspections and crashes, summed up in one Health Score.",
  path: "/tools/carrier-lookup",
  ogImage: false,
});

const MAX_QUERY_LENGTH = 100;

type Param = string | string[] | undefined;

// A repeated key (?q=a&q=b) arrives as an array; take the first.
function firstParam(value: Param): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CarrierLookupPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: Param; status?: Param; mode?: Param }>;
}) {
  const params = await searchParams;
  const status = firstParam(params.status) ?? "All";
  const mode = firstParam(params.mode) ?? "All";
  const rawQuery = firstParam(params.q);
  const query = rawQuery?.slice(0, MAX_QUERY_LENGTH);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        {query === undefined ? (
          <LookupLanding mode={mode} />
        ) : (
          <Suspense key={`${query}|${status}`} fallback={<LookupSearchFallback query={query} />}>
            <LookupSearch query={query} status={status} />
          </Suspense>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
