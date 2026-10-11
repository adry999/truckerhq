import { ogImageSize, ogImageContentType, renderOgImage } from "@/shared/seo/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "green",
    kicker: "Free · No Sign-Up",
    heading: "Free trucking tools",
    headingSize: 120,
    paragraph: "Carrier lookup, profit per mile, compliance alerts and more.",
    big: "Built on FMCSA data",
  });
}
