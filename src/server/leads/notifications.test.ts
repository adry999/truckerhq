import { beforeEach, describe, expect, it, vi } from "vitest";

const sendSms = vi.fn(async () => {});
vi.mock("@/server/messaging/sms", () => ({ sendSms: (...args: unknown[]) => sendSms(...(args as [])) }));
vi.mock("@/server/messaging/sms-throttle", () => ({ claimSmsSlot: () => true }));

import { notifyApplication, notifyComplianceAlertsOn, notifyDispatchStart, RU_SMS_APPROVED, smsLanguage } from "./notifications";

beforeEach(() => sendSms.mockClear());

describe("SMS language", () => {
  it("keeps Russian SMS off until the copy is approved", () => {
    expect(RU_SMS_APPROVED).toBe(false);
    expect(smsLanguage("RU")).toBe("EN");
    expect(smsLanguage("Русский")).toBe("EN");
  });

  it("sends English for every lead language while Russian is gated", async () => {
    await notifyDispatchStart("+15555550100", "Русский");
    await notifyApplication("+15555550100", "OTR Driver", "RU");
    await notifyComplianceAlertsOn("+15555550100", "DOT 123", "RU");
    const bodies = sendSms.mock.calls.map((c) => (c as unknown as [string, string])[1]);
    expect(bodies).toHaveLength(3);
    for (const body of bodies) expect(body).toMatch(/^Trucker HQ: [A-Za-z]/);
    expect(bodies.join(" ")).not.toMatch(/[А-Яа-я]/);
  });
});
