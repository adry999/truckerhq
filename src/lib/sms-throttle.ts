import "server-only";

const PER_PHONE_MS = 10 * 60_000;
const GLOBAL_WINDOW_MS = 60 * 60_000;
const GLOBAL_MAX = 30;

// In-memory, so this is a per-instance speed bump against SMS-pumping abuse;
// a shared store is a later step.
const lastSent = new Map<string, number>();
let sends: number[] = [];

export function claimSmsSlot(phoneE164: string, now = Date.now()): boolean {
  for (const [phone, t] of lastSent) {
    if (now - t >= PER_PHONE_MS) lastSent.delete(phone);
  }
  sends = sends.filter((t) => now - t < GLOBAL_WINDOW_MS);

  if (lastSent.has(phoneE164) || sends.length >= GLOBAL_MAX) return false;
  lastSent.set(phoneE164, now);
  sends.push(now);
  return true;
}

export function resetSmsThrottle(): void {
  lastSent.clear();
  sends = [];
}
