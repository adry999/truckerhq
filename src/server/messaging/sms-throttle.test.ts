import { describe, it, expect, beforeEach } from "vitest";
import { claimSmsSlot, resetSmsThrottle } from "@/server/messaging/sms-throttle";

const T0 = 1_000_000;
const MIN = 60_000;
const phone = (i: number) => `+1312555${String(i).padStart(4, "0")}`;

beforeEach(resetSmsThrottle);

describe("claimSmsSlot", () => {
  it("blocks a second send to the same phone within 10 minutes", () => {
    expect(claimSmsSlot(phone(1), T0)).toBe(true);
    expect(claimSmsSlot(phone(1), T0 + 9 * MIN)).toBe(false);
  });

  it("allows the same phone again after 10 minutes", () => {
    expect(claimSmsSlot(phone(1), T0)).toBe(true);
    expect(claimSmsSlot(phone(1), T0 + 10 * MIN)).toBe(true);
  });

  it("blocks the 31st distinct phone within an hour", () => {
    for (let i = 0; i < 30; i++) expect(claimSmsSlot(phone(i), T0 + i * 1000)).toBe(true);
    expect(claimSmsSlot(phone(30), T0 + 31_000)).toBe(false);
  });

  it("resets the global cap after an hour", () => {
    for (let i = 0; i < 30; i++) claimSmsSlot(phone(i), T0);
    expect(claimSmsSlot(phone(99), T0 + 30 * MIN)).toBe(false);
    expect(claimSmsSlot(phone(99), T0 + 60 * MIN)).toBe(true);
  });
});
