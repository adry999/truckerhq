"use client";

import { GA_ID, META_PIXEL_ID } from "@/shared/client/analytics";
import { resetConsent } from "@/shared/client/consent";

/** Reopens the consent banner. Renders nothing when no tracker is configured. */
export function CookieSettingsButton({ className, label = "Cookie settings" }: { className?: string; label?: string }) {
  if (!GA_ID && !META_PIXEL_ID) return null;
  return (
    <button type="button" onClick={resetConsent} className={className}>
      {label}
    </button>
  );
}
