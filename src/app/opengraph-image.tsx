import { PHONE_DISPLAY } from "@/lib/contact";
import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    theme: "dark",
    kicker: "Dispatch · Jobs · Tools",
    heading: "Your HQ on the road",
    headingSize: 120,
    paragraph:
      "Flat-rate dispatch, CDL jobs and free carrier tools. English & Russian, 24/7.",
    big: PHONE_DISPLAY,
    shield: true,
    shieldOpacity: 1,
  });
}
