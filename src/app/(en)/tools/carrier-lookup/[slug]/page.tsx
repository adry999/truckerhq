import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CARRIERS, CarrierProfile, findCarrier } from "@/features/carriers";

export function generateStaticParams() {
  return CARRIERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = findCarrier(slug);
  if (!c) return {};
  return buildMetadata({
    title: `${c.name} — DOT ${c.dot} Health Score ${c.score}`,
    description: `Sample carrier profile: ${c.name} in ${c.city}, ${c.st}. DOT ${c.dot}, ${c.mc}. Authority ${c.status}, ${c.trucks} trucks. Health Score ${c.score}/100.`,
    path: `/tools/carrier-lookup/${slug}`,
    ogImage: "/opengraph-image",
    robots: { index: false, follow: true },
  });
}

export default async function CarrierProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = findCarrier(slug);
  if (!c) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <CarrierProfile carrier={c} />
      <SiteFooter />
    </div>
  );
}
