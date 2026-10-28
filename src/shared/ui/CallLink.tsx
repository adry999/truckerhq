"use client";

import type { ComponentProps } from "react";
import { trackEvent } from "@/shared/client/analytics";
import { PHONE_HREF } from "@/shared/config/contact";

/** Click-to-call anchor that reports a `call_click` conversion with where it was clicked. */
export function CallLink({
  placement,
  onClick,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { placement: string }) {
  return (
    <a
      {...props}
      href={PHONE_HREF}
      onClick={(e) => {
        trackEvent("call_click", { placement });
        onClick?.(e);
      }}
    />
  );
}
