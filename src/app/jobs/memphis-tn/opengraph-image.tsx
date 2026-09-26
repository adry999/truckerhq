import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "dark",
    sub: "JOBS",
    kicker: "175 Open Jobs",
    heading: "CDL jobs in Memphis, TN",
    headingSize: 108,
    paragraph: "Pay and home time on every listing. Apply in English or Russian.",
    big: "Updated daily",
  });
}
