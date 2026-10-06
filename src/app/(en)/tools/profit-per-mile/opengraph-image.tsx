import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "green",
    kicker: "Free · No Sign-Up",
    heading: "Profit per Mile Calculator",
    headingSize: 108,
    paragraph: "Enter the load and your costs. See your real profit.",
    big: "Built on FMCSA data",
  });
}
