"use client";

type Consent = "granted" | "denied";

export default function ConsentBanner({
  onChoice,
}: {
  onChoice: (consent: Consent) => void;
}) {
  function choose(consent: Consent) {
    try {
      localStorage.setItem("chq_consent", consent);
    } catch {
      // localStorage unavailable (private mode, blocked) — consent still
      // applies for this page view via component state.
    }
    onChoice(consent);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
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
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => choose("denied")}
            className="flex h-11 items-center rounded-[10px] border border-white/30 px-4 text-sm font-semibold text-offwhite hover:border-amber"
          >
            Decline
          </button>
          <button
            onClick={() => choose("granted")}
            className="flex h-11 items-center rounded-[10px] bg-amber px-4 text-sm font-bold text-asphalt hover:bg-amber-hover"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
