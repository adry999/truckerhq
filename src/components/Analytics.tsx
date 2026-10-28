"use client";

import Script from "next/script";
import { Suspense, useEffect, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_ID, META_PIXEL_ID } from "@/shared/client/analytics";
import { getConsentSnapshot, getConsentServerSnapshot, subscribeConsent, setConsent } from "@/shared/client/consent";
import ConsentBanner from "./ConsentBanner";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Only these query params are safe to send to analytics — everything else
// (free-text search like ?q=, DOT/MC lookups) may contain a visitor's own
// input and shouldn't leave the browser as an analytics dimension.
const SAFE_QUERY_PARAMS = ["mode", "equip", "type", "status", "utm_source", "utm_medium", "utm_campaign"];

const GA_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
const FB_SRC = "https://connect.facebook.net/en_US/fbevents.js";

type FbqStub = ((...args: unknown[]) => void) & {
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

// The stubs queue calls until the remote scripts arrive, so the first pageview is never lost.
// They are installed only after consent is granted: nothing is fetched or defined before that.
let gaReady = false;
let fbReady = false;

function initGoogle(id: string) {
  if (gaReady) return;
  gaReady = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag ??= function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", id, { send_page_view: false });
}

function initMeta(id: string) {
  if (fbReady) return;
  fbReady = true;
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      // fbevents.js replaces callMethod once loaded; until then calls are queued.
      const self = fbq as unknown as FbqStub & { callMethod?: (...a: unknown[]) => void };
      if (self.callMethod) self.callMethod(...args);
      else self.queue.push(args);
    } as FbqStub;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
  }
  window.fbq("init", id);
}

/** Mounted only while consent is granted: sends exactly one pageview per URL. */
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const safeParams = new URLSearchParams();
  for (const key of SAFE_QUERY_PARAMS) {
    const value = searchParams.get(key);
    if (value) safeParams.set(key, value);
  }
  const qs = safeParams.toString();
  const url = qs ? `${pathname}?${qs}` : pathname;

  useEffect(() => {
    if (GA_ID) {
      initGoogle(GA_ID);
      window.gtag?.("event", "page_view", { page_path: url });
    }
    if (META_PIXEL_ID) {
      initMeta(META_PIXEL_ID);
      window.fbq?.("track", "PageView");
    }
  }, [url]);

  return null;
}

export default function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);

  useEffect(() => {
    // Choice withdrawn (Cookie settings) after trackers were loaded: tell GA to stop.
    if (consent !== "granted" && gaReady) {
      window.gtag?.("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  }, [consent]);

  if (!GA_ID && !META_PIXEL_ID) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          {GA_ID && <Script id="gtag-js" src={GA_SRC} strategy="afterInteractive" />}
          {META_PIXEL_ID && <Script id="fbevents-js" src={FB_SRC} strategy="afterInteractive" />}
          <Suspense fallback={null}>
            <PageviewTracker />
          </Suspense>
        </>
      )}
      {consent === null && <ConsentBanner onChoice={setConsent} />}
    </>
  );
}
