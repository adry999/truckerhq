import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { GUIDES, GuideArticle, findGuide, guideDescription } from "@/features/guides";

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    author: { "@type": "Person", name: guide.author },
    datePublished: guide.date,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={schema} />
      <SiteHeader />
      <GuideArticle guide={guide} />
      <SiteFooter />
    </div>
  );
}
