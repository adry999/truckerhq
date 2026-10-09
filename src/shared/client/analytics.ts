export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
  }
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

// Events that represent an actual sales lead map to Meta's standard "Lead"
// event (better ad-optimization signal); everything else is a custom event
// so Meta's conversion tools aren't skewed by non-lead activity.
const META_LEAD_EVENTS = new Set([
  "job_application",
  "contact_message",
  "hire_driver_post",
  "dispatch_start_request",
]);

// Never forward these params to Meta: a DOT/MC number can identify a
// sole-proprietor owner-operator via public FMCSA records.
const META_BLOCKED_PARAMS = new Set(["dot", "mc_number", "phone", "email", "name"]);

/**
 * Fires a conversion event to both GA4 and Meta Pixel, if their scripts are
 * loaded (see <Analytics /> in layout.tsx). No-ops silently when the
 * NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_META_PIXEL_ID env vars aren't set.
 */
export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);

  const metaParams: Record<string, string | number | boolean> = { content_name: name };
  for (const [key, value] of Object.entries(params ?? {})) {
    if (!META_BLOCKED_PARAMS.has(key)) metaParams[key] = value;
  }

  if (META_LEAD_EVENTS.has(name)) {
    window.fbq?.("track", "Lead", metaParams);
  } else {
    window.fbq?.("trackCustom", name, metaParams);
  }
}
