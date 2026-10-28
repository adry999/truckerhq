"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useSyncExternalStore } from "react";
import { GA_ID, META_PIXEL_ID } from "@/shared/client/analytics";
import { getConsentServerSnapshot, getConsentSnapshot, subscribeConsent } from "@/shared/client/consent";
import { useBodyInset } from "@/shared/hooks/useBodyInset";
import { CallLink } from "./CallLink";

const SHOWN_ON = /^(\/ru)?(\/|\/dispatch|\/carriers(\/.*)?|\/tools\/carrier-lookup(\/.*)?)$/;

/** Phone-only bottom bar with the two conversion actions. Yields to the consent banner. */
export function MobileCtaBar({
  startHref,
  startLabel,
  callLabel,
}: {
  startHref: string;
  startLabel: string;
  callLabel: string;
}) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);
  const ref = useRef<HTMLDivElement>(null);
  const bannerShowing = consent === null && Boolean(GA_ID || META_PIXEL_ID);
  const visible = SHOWN_ON.test(pathname) && !bannerShowing;
  useBodyInset(ref, visible);

  if (!visible) return null;
  return (
    <div
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] gap-2 border-t border-white/15 bg-asphalt px-3 py-2.5 lg:hidden"
    >
      <Link
        href={startHref}
        className="flex h-12 items-center justify-center rounded-[10px] bg-amber px-4 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
      >
        {startLabel}
      </Link>
      <CallLink
        placement="mobile_bar"
        className="flex h-12 items-center justify-center rounded-[10px] border-2 border-offwhite px-4 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite"
      >
        {callLabel}
      </CallLink>
    </div>
  );
}
