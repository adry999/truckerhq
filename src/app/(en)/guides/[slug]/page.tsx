import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articleSchema, faqSchema } from "@/shared/seo/structured-data";
import { SITE_URL } from "@/shared/config/site";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { GUIDES, GuideArticle, findGuide, getGuideBody, guideDescription, hasGuideBody } from "@/features/guides";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) return {};

  return buildMetadata({
    title: guide.title,
    description: guideDescription(guide),
    path: `/guides/${slug}`,
    ogImage: false,
    robots: hasGuideBody(guide) ? undefined : { index: false, follow: true },
  });
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = findGuide(slug);
  if (!guide) notFound();

  // The byline is a placeholder until a real author is set; credit the organization then.
  const hasRealAuthor = !/name/i.test(guide.author);
  const schema = articleSchema({
    title: guide.title,
    path: `/guides/${slug}`,
    datePublished: guide.date,
    author: hasRealAuthor ? guide.author : undefined,
    // The per-guide OG route gets a build hash in its URL, so point at the stable root image.
    image: `${SITE_URL}/opengraph-image`,
  });

  const faqs = getGuideBody(guide)?.faqs ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      {hasGuideBody(guide) && <JsonLd data={schema} />}
      {hasGuideBody(guide) && faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <GuideArticle guide={guide} />
      </main>
      <SiteFooter />
    </div>
  );
}
