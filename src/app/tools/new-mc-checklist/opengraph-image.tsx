import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "green",
    kicker: "Free · No Sign-Up",
    heading: "New MC Checklist",
    headingSize: 120,
    paragraph: "Every filing and setup step, from BOC-3 to the safety audit.",
    big: "Built on FMCSA data",
  });
}
