"use client";

import { useEffect, useRef } from "react";

export function useStepFocus<T extends HTMLElement = HTMLHeadingElement>(step: number) {
  const ref = useRef<T>(null);
  const previous = useRef(step);

  useEffect(() => {
    if (previous.current === step) return;
    previous.current = step;
    ref.current?.focus();
  }, [step]);

  return ref;
}
