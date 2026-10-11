export type Consent = "granted" | "denied" | null;

const STORAGE_KEY = "chq_consent";
const listeners = new Set<() => void>();
let cached: Consent | undefined;

function computeConsent(): Consent {
  try {
    if (navigator.globalPrivacyControl) return "denied";
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** For useSyncExternalStore: the current consent, computed once and cached. */
export function getConsentSnapshot(): Consent {
  if (cached === undefined) cached = computeConsent();
  return cached;
}

/** For useSyncExternalStore: value used during server rendering. */
export function getConsentServerSnapshot(): Consent {
  return null;
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setConsent(value: "granted" | "denied"): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage unavailable (private mode, blocked) — consent still
    // applies for this page view via the in-memory cache below.
  }
  cached = value;
  listeners.forEach((l) => l());
}
