import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, datasetSchema } from "@/shared/seo/structured-data";
import { StateCarriersView, STATE_CONTENT, STATE_DATA_IS_SAMPLE, STATE_SLUGS } from "@/features/carriers";

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
    robots: STATE_DATA_IS_SAMPLE ? { index: false, follow: true } : undefined,
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
      <JsonLd
        data={datasetSchema({
          name: `${entry.stateName} for-hire carriers (FMCSA census)`,
          description: `Counts of active interstate for-hire carriers based in ${entry.stateName}, from the FMCSA Company Census File.`,
          path: `/carriers/${state}`,
          sourceName: entry.sourceName,
          sourceUrl: entry.sourceUrl,
          dateModified: entry.sourceFetchedAt,
          variables: [
            "Active for-hire carriers",
            "New carriers in the last 12 months",
            "Small fleet share",
            "Power units",
          ],
        })}
      />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
          <StateCarriersView
            stateAbbr={entry.stateAbbr}
            stateName={entry.stateName}
            heroImage={entry.heroImage}
            heroAlt={entry.heroAlt}
            heroDescription={entry.heroDescription}
            stats={entry.stats}
            topCities={entry.topCities}
            sourceName={entry.sourceName}
            sourceUrl={entry.sourceUrl}
            sourceFetchedAt={entry.sourceFetchedAt}
            dispatchCtaEyebrow={entry.dispatchCtaEyebrow}
            dispatchCtaTitle={entry.dispatchCtaTitle}
            dispatchCtaBody={entry.dispatchCtaBody}
            hireCtaBody={entry.hireCtaBody}
          />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
