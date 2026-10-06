import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";
import { ruOgFontConfig } from "@/lib/og-ru";

export const alt = "Trucker HQ — работа CDL с указанной оплатой";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    ...ruOgFontConfig,
    theme: "light",
    kicker: "Работа CDL",
    heading: "Работа CDL. Оплата указана сразу.",
    headingSize: 108,
    paragraph: "В каждой вакансии — оплата и время дома. У каждого перевозчика — Health Score.",
    big: "Отклик на английском или русском",
  });
}
