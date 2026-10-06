import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";
import { ruOgFontConfig } from "@/lib/og-ru";

export const alt = "Trucker HQ — диспетчинг: фиксированная цена в неделю, без процентов";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    ...ruOgFontConfig,
    theme: "green",
    kicker: "Диспетчинг · 24/7",
    heading: "Фиксированная цена в неделю. Без процентов.",
    headingSize: 100,
    paragraph: "$XXX за трак в неделю. Диспетчеры во всех часовых поясах США.",
    big: "$XXX / неделя",
  });
}
