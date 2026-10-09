import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/metadata";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/shared/seo/structured-data";
import { findCarrier } from "@/features/carriers";
import {
  CityJobsView,
  JobDetail,
  MIN_JOBS_TO_INDEX,
  jobsStaticSlugs,
  resolveJobsSlug,
} from "@/features/jobs";

export function generateStaticParams() {
  return jobsStaticSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const resolved = resolveJobsSlug(slug);
  if (resolved.kind === "city") {
    const { city } = resolved;
    return buildMetadata({
      title: city.title,
      description: city.description,
      path: `/jobs/${slug}`,
      ogImage: false,
      robots:
        city.jobs.length >= MIN_JOBS_TO_INDEX
          ? undefined
          : { index: false, follow: true },
    });
  }

  if (resolved.kind === "none") return {};
  const { job } = resolved;
  return buildMetadata({
    title: `${job.title} — ${job.company}`,
    description: `${job.title} at ${job.company}, ${job.loc}. ${job.pay} ${job.payNote}. ${job.home}.`,
    path: `/jobs/${slug}`,
    ogImage: false,
    robots: { index: false, follow: true },
  });
}

export default async function JobsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const resolved = resolveJobsSlug(slug);
  if (resolved.kind === "city") {
    const { city } = resolved;
    return (
      <>
        <JsonLd data={faqSchema(city.faqs)} />
        <JsonLd
          data={breadcrumbSchema([
            { name: "CDL jobs", path: "/jobs" },
            { name: city.stateName, path: "/jobs" },
            { name: city.cityName, path: `/jobs/${slug}` },
          ])}
        />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <CityJobsView
            cityName={city.cityName}
            stateName={city.stateName}
            heroIntro={city.heroIntro}
            stats={city.stats}
            jobs={city.jobs}
            faqs={city.faqs}
            hiringCarriers={city.hiringCarriers}
            nearbyCities={city.nearbyCities}
            basePath={`/jobs/${slug}`}
          />
          <SiteFooter />
        </div>
      </>
    );
  }

  if (resolved.kind === "none") notFound();
  const { job } = resolved;
  const carrier = findCarrier(job.carrierSlug);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <JobDetail job={job} carrier={carrier} />
      <SiteFooter />
    </div>
  );
}
