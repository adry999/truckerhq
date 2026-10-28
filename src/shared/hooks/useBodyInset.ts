"use client";

import { useEffect, type RefObject } from "react";

/**
 * Pads the bottom of <body> by the height of a fixed bar while it is on screen, so the bar
 * never hides the end of the page (submit buttons, footer). A hidden bar measures 0.
 */
export function useBodyInset(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;
    const apply = () => {
      document.body.style.paddingBottom = `${el.getBoundingClientRect().height}px`;
    };
    apply();
    if (typeof ResizeObserver === "undefined") {
      return () => {
        document.body.style.paddingBottom = "";
      };
    }
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, [ref, active]);
}
