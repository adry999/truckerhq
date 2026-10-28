"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { postJson } from "@/shared/client/post-json";
import { splitFieldErrors, useFieldErrors } from "./useFieldErrors";
import type { TurnstileController } from "./useTurnstile";

type Status = "idle" | "submitting" | "sent" | "error";

export function useFormSubmit<T extends object>({
  endpoint,
  buildBody,
  onSuccess,
  turnstile,
  knownFields,
  genericError = "Something went wrong. Try again in a moment.",
}: {
  endpoint: string;
  buildBody: (form: HTMLFormElement) => T;
  onSuccess?: () => void;
  /** Adds `turnstileToken` to every body and resets the widget after a failed submit. */
  turnstile?: Pick<TurnstileController, "token" | "reset">;
  /** Body keys the form shows inline. Server field errors for other keys fall back to the global message. */
  knownFields?: readonly string[];
  genericError?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  /** Attach to the success heading (`tabIndex={-1}`): it takes focus once the form is sent. */
  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const focusInvalid = useRef(false);
  const { fieldErrors, setFieldErrors, clearFieldError, clearFieldErrors } = useFieldErrors();

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  // Puts the cursor on the first field the server rejected.
  useEffect(() => {
    if (!focusInvalid.current) return;
    focusInvalid.current = false;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [fieldErrors]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    formRef.current = form;
    setStatus("submitting");
    setError(null);
    clearFieldErrors();
    const website = new FormData(form).get("website");
    const token = turnstile?.token;
    const result = await postJson(endpoint, {
      ...buildBody(form),
      website,
      ...(token ? { turnstileToken: token } : {}),
    });
    if (result.ok) {
      setStatus("sent");
      onSuccess?.();
      return;
    }
    turnstile?.reset();
    const { matched, hasUnmatched } = splitFieldErrors(
      result.fields,
      knownFields && ((key) => knownFields.includes(key)),
    );
    const inline = Object.keys(matched).length > 0;
    focusInvalid.current = inline;
    setFieldErrors(matched);
    setError(inline && !hasUnmatched ? null : (result.message ?? genericError));
    setStatus("error");
  }

  function reset() {
    setStatus("idle");
    setError(null);
    clearFieldErrors();
  }

  return { status, error, fieldErrors, clearFieldError, onSubmit, reset, successRef };
}
