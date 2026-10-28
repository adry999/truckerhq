import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/shared/seo/structured-data";
import { DISPATCH_SERVICE_PAGES, ServicePageView, findServicePage } from "@/features/dispatch";

export const dynamicParams = false;

export function generateStaticParams() {
  return DISPATCH_SERVICE_PAGES.map((p) => ({ service: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const page = findServicePage(service);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/dispatch/${page.slug}`,
    ogImage: false,
  });
}

export default async function DispatchServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const page = findServicePage(service);
  if (!page) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(page.faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Dispatch", path: "/dispatch" },
          { name: page.name, path: `/dispatch/${page.slug}` },
        ])}
      />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <ServicePageView page={page} />
      </main>
      <SiteFooter />
    </div>
  );
}
