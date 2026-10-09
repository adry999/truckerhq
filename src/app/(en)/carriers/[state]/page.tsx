import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { StateCarriersView, STATE_CONTENT, STATE_SLUGS } from "@/features/carriers";

export function generateStaticParams() {
  return STATE_SLUGS.map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const entry = STATE_CONTENT[state];
  if (!entry) return {};
  return buildMetadata({
    title: entry.title,
    description: entry.description,
    path: `/carriers/${state}`,
    ogImage: "/opengraph-image",
  });
}

export default async function StateCarriersRoute({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const entry = STATE_CONTENT[state];
  if (!entry) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Carrier Lookup", path: "/tools/carrier-lookup" },
          { name: "States", path: "/carriers" },
          { name: entry.stateName, path: `/carriers/${state}` },
        ])}
      />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <StateCarriersView
          stateAbbr={entry.stateAbbr}
          stateName={entry.stateName}
          heroImage={entry.heroImage}
          heroAlt={entry.heroAlt}
          heroDescription={entry.heroDescription}
          stats={entry.stats}
          equipmentBreakdown={entry.equipmentBreakdown}
          topCities={entry.topCities}
          equipmentOptions={entry.equipmentOptions}
          carriers={entry.carriers}
          totalCount={entry.totalCount}
          dispatchCtaEyebrow={entry.dispatchCtaEyebrow}
          dispatchCtaTitle={entry.dispatchCtaTitle}
          dispatchCtaBody={entry.dispatchCtaBody}
          hireCtaBody={entry.hireCtaBody}
          basePath={`/carriers/${state}`}
        />
        <SiteFooter />
      </div>
    </>
  );
}
