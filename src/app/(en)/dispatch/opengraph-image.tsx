import { ogImageSize, ogImageContentType, renderOgImage } from "@/shared/seo/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "green",
    kicker: "Truck Dispatch · 24/7",
    heading: "One flat price. No percentage.",
    headingSize: 116,
    paragraph: "$XXX per truck per week. Dispatchers on every US time zone.",
    big: "$XXX / week",
  });
}
