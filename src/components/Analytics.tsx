"use client";

import Script from "next/script";
import { Suspense, useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_ID, META_PIXEL_ID } from "@/lib/analytics";
import { getConsentSnapshot, getConsentServerSnapshot, subscribeConsent, setConsent, type Consent } from "@/lib/consent";
import ConsentBanner from "./ConsentBanner";

// Only these query params are safe to send to analytics — everything else
// (free-text search like ?q=, DOT/MC lookups) may contain a visitor's own
// input and shouldn't leave the browser as an analytics dimension.
const SAFE_QUERY_PARAMS = ["mode", "equip", "type", "status", "utm_source", "utm_medium", "utm_campaign"];

function PageviewTracker({ consent }: { consent: Consent }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fbInitedRef = useRef(false);

  useEffect(() => {
    const safeParams = new URLSearchParams();
    for (const key of SAFE_QUERY_PARAMS) {
      const value = searchParams.get(key);
      if (value) safeParams.set(key, value);
    }
    const qs = safeParams.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;

    if (GA_ID) window.gtag?.("config", GA_ID, { page_path: url });

    if (META_PIXEL_ID && consent === "granted") {
      if (!fbInitedRef.current) {
        window.fbq?.("init", META_PIXEL_ID);
        fbInitedRef.current = true;
      }
      window.fbq?.("track", "PageView");
    }
  }, [pathname, searchParams, consent]);

  return null;
}

export default function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);

  useEffect(() => {
    if (consent === "granted") {
      window.gtag?.("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
  }, [consent]);

  if (!GA_ID && !META_PIXEL_ID) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });`}
          </Script>
        </>
      )}
      {META_PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');`}
        </Script>
      )}
      <Suspense fallback={null}>
        <PageviewTracker consent={consent} />
      </Suspense>
      {consent === null && <ConsentBanner onChoice={setConsent} />}
    </>
  );
}
