"use client";

import { useCallback, useState } from "react";
import { TURNSTILE_SITE_KEY } from "@/shared/config/turnstile";

export type TurnstileController = {
  /** Current token, or null until the widget solves (and always null without a site key). */
  token: string | null;
  /** True when the form may be submitted: no site key configured, or a token exists. */
  ready: boolean;
  /** Bumped by `reset`; the widget re-runs its challenge when it changes. */
  resetNonce: number;
  setToken: (token: string | null) => void;
  /** Tokens are single-use: call after any submit attempt that reached the server. */
  reset: () => void;
};

export function useTurnstile(): TurnstileController {
  const [token, setTokenState] = useState<string | null>(null);
  const [resetNonce, setResetNonce] = useState(0);

  const setToken = useCallback((next: string | null) => setTokenState(next), []);
  const reset = useCallback(() => {
    setTokenState(null);
    setResetNonce((n) => n + 1);
  }, []);

  return { token, ready: !TURNSTILE_SITE_KEY || token !== null, resetNonce, setToken, reset };
}
