"use client";

import { useRef } from "react";
import { useBodyInset } from "@/shared/hooks/useBodyInset";

type Consent = "granted" | "denied";

// onChoice persists the choice (see setConsent in shared/client/consent).
export default function ConsentBanner({
  onChoice,
}: {
  onChoice: (consent: Consent) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  // Fixed bar: pad the page by its height so it never covers a submit button.
  useBodyInset(ref, true);

  return (
    <section
      ref={ref}
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-asphalt text-offwhite"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm leading-relaxed text-[#D4D6DA]">
          We use cookies for analytics and ads (Google Analytics, Meta
          Pixel). See our{" "}
          <a href="/privacy" className="text-amber underline">
            Privacy Policy
          </a>
          .
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => onChoice("denied")}
            className="flex h-12 items-center justify-center rounded-[10px] border border-white/30 px-4 text-sm font-semibold text-offwhite hover:border-amber sm:h-11"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => onChoice("granted")}
            className="flex h-12 items-center justify-center rounded-[10px] bg-amber px-4 text-sm font-bold text-asphalt hover:bg-amber-hover sm:h-11"
          >
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
