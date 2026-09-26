export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

/**
 * Fires a conversion event to both GA4 and Meta Pixel, if their scripts are
 * loaded (see <Analytics /> in layout.tsx). No-ops silently when the
 * NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_META_PIXEL_ID env vars aren't set.
 */
export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
  window.fbq?.("track", "Lead", { content_name: name, ...params });
}
