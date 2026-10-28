"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type FieldErrors = Record<string, string>;

/** Splits server field messages into those the form can show inline and those it cannot. */
export function splitFieldErrors(
  fields: FieldErrors,
  isKnown: (key: string) => boolean = () => true,
): { matched: FieldErrors; hasUnmatched: boolean } {
  const matched: FieldErrors = {};
  let hasUnmatched = false;
  for (const [key, message] of Object.entries(fields)) {
    if (isKnown(key)) matched[key] = message;
    else hasUnmatched = true;
  }
  return { matched, hasUnmatched };
}

/** Per-field server errors; an error is dropped as soon as the user edits that field. */
export function useFieldErrors() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const clearFieldError = useCallback((key: string) => {
    setFieldErrors((prev) => {
      if (!(key in prev)) return prev;
      const rest = { ...prev };
      delete rest[key];
      return rest;
    });
  }, []);

  const clearFieldErrors = useCallback(() => {
    setFieldErrors((prev) => (Object.keys(prev).length === 0 ? prev : {}));
  }, []);

  return { fieldErrors, setFieldErrors, clearFieldError, clearFieldErrors };
}

/**
 * For wizards: call `requestFocus()` together with the state updates of a failed submit and the first
 * `aria-invalid` control inside `formRef` takes focus once the (possibly earlier) step has rendered.
 * Declare it after `useStepFocus` so it wins over the step heading.
 */
export function useFocusInvalid() {
  const formRef = useRef<HTMLFormElement>(null);
  const pending = useRef(false);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  });

  return {
    formRef,
    requestFocus: () => {
      pending.current = true;
    },
  };
}
