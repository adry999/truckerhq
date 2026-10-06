import { PHONE_DISPLAY } from "@/lib/contact";
import { ogImageSize, ogImageContentType, renderOgImage } from "@/lib/og";
import { ruOgFontConfig } from "@/lib/og-ru";

export const alt = "Trucker HQ — диспетчинг, работа CDL и бесплатные инструменты";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderOgImage({
    ...ruOgFontConfig,
    theme: "dark",
    kicker: "Диспетчинг · Работа CDL · Инструменты",
    heading: "Диспетчер, который ответит в 3 часа ночи",
    headingSize: 84,
    paragraph:
      "Фиксированная цена в неделю, никаких процентов. Диспетчеры говорят по-английски и по-русски, во всех часовых поясах США.",
    big: PHONE_DISPLAY,
    shield: true,
    shieldOpacity: 1,
  });
}
