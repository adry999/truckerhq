import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "green",
    kicker: "Free · No Sign-Up",
    heading: "Compliance Alerts by Text",
    headingSize: 108,
    paragraph: "Know before your insurance, UCR or authority lapses.",
    big: "Built on FMCSA data",
  });
}
