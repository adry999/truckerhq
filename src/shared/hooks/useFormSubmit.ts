"use client";

import { useState, type FormEvent } from "react";
import { postJson } from "@/shared/client/post-json";

type Status = "idle" | "submitting" | "sent" | "error";

export function useFormSubmit<T extends object>({
  endpoint,
  buildBody,
  onSuccess,
  genericError = "Something went wrong. Try again in a moment.",
}: {
  endpoint: string;
  buildBody: (form: HTMLFormElement) => T;
  onSuccess?: () => void;
  genericError?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError(null);
    const website = new FormData(form).get("website");
    const result = await postJson(endpoint, { ...buildBody(form), website });
    if (result.ok) {
      setStatus("sent");
      onSuccess?.();
      return;
    }
    setError(result.message ?? genericError);
    setStatus("error");
  }

  function reset() {
    setStatus("idle");
    setError(null);
  }

  return { status, error, onSubmit, reset };
}
