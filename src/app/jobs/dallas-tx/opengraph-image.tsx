import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "dark",
    sub: "JOBS",
    kicker: "210 Open Jobs",
    heading: "CDL jobs in Dallas, TX",
    headingSize: 108,
    paragraph: "Pay and home time on every listing. Apply in English or Russian.",
    big: "Updated daily",
  });
}
