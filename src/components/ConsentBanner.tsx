"use client";

import { useRef } from "react";
import { useBodyInset } from "@/shared/hooks/useBodyInset";

type Consent = "granted" | "denied";

// RU strings need native review (see docs/STATUS.md). There is no RU privacy page, so both link to /privacy.
const COPY = {
  en: {
    region: "Cookie consent",
    text: "We use cookies for analytics and ads (Google Analytics, Meta Pixel). See our",
    privacy: "Privacy Policy",
    decline: "Decline",
    accept: "Accept",
  },
  ru: {
    region: "Согласие на cookie",
    text: "Мы используем cookie для аналитики и рекламы (Google Analytics, Meta Pixel). Подробнее в",
    privacy: "Политике конфиденциальности (англ.)",
    decline: "Отклонить",
    accept: "Принять",
  },
} as const;

// onChoice persists the choice (see setConsent in shared/client/consent).
export default function ConsentBanner({
  lang = "en",
  onChoice,
}: {
  lang?: "en" | "ru";
  onChoice: (consent: Consent) => void;
}) {
  const t = COPY[lang];
  const ref = useRef<HTMLElement>(null);
  // Fixed bar: pad the page by its height so it never covers a submit button.
  useBodyInset(ref, true);

  return (
    <section
      ref={ref}
      aria-label={t.region}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-asphalt text-offwhite"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm leading-relaxed text-[#D4D6DA]">
          {t.text}{" "}
          <a href="/privacy" className="text-amber underline">
            {t.privacy}
          </a>
          .
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => onChoice("denied")}
            className="flex h-12 items-center justify-center rounded-[10px] border border-white/30 px-4 text-sm font-semibold text-offwhite hover:border-amber sm:h-11"
          >
            {t.decline}
          </button>
          <button
            type="button"
            onClick={() => onChoice("granted")}
            className="flex h-12 items-center justify-center rounded-[10px] bg-amber px-4 text-sm font-bold text-asphalt hover:bg-amber-hover sm:h-11"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </section>
  );
}
