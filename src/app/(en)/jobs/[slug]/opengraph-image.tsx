import { resolveJobsSlug } from "@/features/jobs";
import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const resolved = resolveJobsSlug(slug);
  if (resolved.kind === "city") {
    const { city } = resolved;
    return renderOgImage({
      theme: "dark",
      sub: "JOBS",
      kicker: `${city.stats[0]?.big ?? ""} Open Jobs`,
      heading: `CDL jobs in ${city.cityName}`,
      headingSize: 108,
      paragraph: "Pay and home time on every listing. Apply in English or Russian.",
      big: "Updated daily",
    });
  }

  const job = resolved.kind === "job" ? resolved.job : undefined;

  return renderOgImage({
    theme: "light",
    sub: "JOBS",
    kicker: job ? `${job.type} · ${job.equipment}` : "CDL Jobs",
    heading: job?.title ?? "Driving job",
    headingSize: 112,
    paragraph: job ? `${job.company} · ${job.loc} · ${job.home}` : "",
    big: job?.pay ?? "",
  });
}
