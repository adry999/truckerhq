import { findJob } from "@/lib/data";
import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = findJob(slug);

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
