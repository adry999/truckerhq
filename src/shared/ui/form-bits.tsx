"use client";

import { useEffect, useRef } from "react";

export function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="hidden"
    />
  );
}

// Always rendered: screen readers only announce changes inside a live region that already exists.
// Takes focus when a message appears so the error is in view on phones and read out in order.
export function FormError({ message }: { message: string | null }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (message) ref.current?.focus();
  }, [message]);
  return (
    <p
      ref={ref}
      tabIndex={-1}
      role="alert"
      aria-live="assertive"
      className="text-[13px] font-semibold text-red outline-none"
    >
      {message}
    </p>
  );
}
