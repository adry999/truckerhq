import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "green",
    kicker: "Free · No Sign-Up",
    heading: "Carrier Lookup",
    headingSize: 120,
    paragraph: "Authority, insurance, inspections and crashes — one Health Score.",
    big: "Built on FMCSA data",
  });
}
