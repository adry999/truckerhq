"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { TURNSTILE_SITE_KEY } from "@/shared/config/turnstile";
import type { TurnstileController } from "@/shared/hooks/useTurnstile";
import type { Locale } from "@/shared/i18n/locale";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const LABELS: Record<Locale, string> = { EN: "Spam protection check", RU: "Проверка от спама" };

/** Renders nothing when no site key is configured. */
export function Turnstile({ controller, locale = "EN" }: { controller: TurnstileController; locale?: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const seenNonce = useRef(controller.resetNonce);
  // Only a re-render trigger: onReady fires on every mount, and the effect reads window.turnstile itself.
  const [scriptReady, setScriptReady] = useState(false);
  const { setToken, resetNonce } = controller;

  useEffect(() => {
    const container = containerRef.current;
    if (!TURNSTILE_SITE_KEY || !container || !window.turnstile) return;
    const api = window.turnstile;
    const id = api.render(container, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "light",
      size: "flexible",
      language: locale === "RU" ? "ru" : "en",
      callback: (token: string) => setToken(token),
      "expired-callback": () => setToken(null),
      "error-callback": () => setToken(null),
    });
    widgetId.current = id;
    return () => {
      api.remove(id);
      widgetId.current = null;
      setToken(null);
    };
  }, [scriptReady, locale, setToken]);

  useEffect(() => {
    if (resetNonce === seenNonce.current) return;
    seenNonce.current = resetNonce;
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, [resetNonce]);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <>
      <Script
        id="cf-turnstile"
        src={SCRIPT_SRC}
        strategy="lazyOnload"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} role="group" aria-label={LABELS[locale]} className="min-h-[65px]" />
    </>
  );
}
