import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "dark",
    sub: "JOBS",
    kicker: "150 Open Jobs",
    heading: "CDL jobs in Indianapolis, IN",
    headingSize: 96,
    paragraph: "Pay and home time on every listing. Apply in English or Russian.",
    big: "Updated daily",
  });
}
