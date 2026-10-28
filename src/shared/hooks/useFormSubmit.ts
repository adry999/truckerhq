"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { postJson } from "@/shared/client/post-json";
import type { TurnstileController } from "./useTurnstile";

type Status = "idle" | "submitting" | "sent" | "error";

export function useFormSubmit<T extends object>({
  endpoint,
  buildBody,
  onSuccess,
  turnstile,
  genericError = "Something went wrong. Try again in a moment.",
}: {
  endpoint: string;
  buildBody: (form: HTMLFormElement) => T;
  onSuccess?: () => void;
  /** Adds `turnstileToken` to every body and resets the widget after a failed submit. */
  turnstile?: Pick<TurnstileController, "token" | "reset">;
  genericError?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  /** Attach to the success heading (`tabIndex={-1}`): it takes focus once the form is sent. */
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError(null);
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
    setError(result.message ?? genericError);
    setStatus("error");
  }

  function reset() {
    setStatus("idle");
    setError(null);
  }

  return { status, error, onSubmit, reset, successRef };
}
