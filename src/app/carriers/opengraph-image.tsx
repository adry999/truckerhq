import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "green",
    kicker: "Free · No Sign-Up",
    heading: "Carrier Directory by State",
    headingSize: 100,
    paragraph: "Search DOT and MC numbers, filter by equipment, check any Health Score.",
    big: "Built on FMCSA data",
  });
}
