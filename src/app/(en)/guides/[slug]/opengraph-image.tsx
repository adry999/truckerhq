import { findGuide } from "@/features/guides";
import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = findGuide(slug);

  return renderOgImage({
    theme: "light",
    kicker: guide ? `Guide · ${guide.minutes} min read` : "Guide",
    heading: guide?.title ?? "Trucking guide",
    headingSize: 100,
    paragraph: guide ? `By ${guide.author}, Trucker HQ dispatch` : "",
    big: "Free guide",
    shield: true,
    shieldOpacity: 0.9,
  });
}
