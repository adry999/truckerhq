import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/server", async (orig) => ({
  ...(await orig<typeof import("next/server")>()),
  after: (fn: () => unknown) => {
    void fn();
  },
}));
vi.mock("@/server/db/insert-row", () => ({ insertRow: vi.fn() }));
vi.mock("@/lib/notifications", () => ({ notifyComplianceAlertsOn: vi.fn() }));

import { POST } from "./route";
import { insertRow } from "@/server/db/insert-row";
import { notifyComplianceAlertsOn } from "@/lib/notifications";

let n = 0;
function post(body: unknown, raw?: string) {
  return POST(
    new Request("https://truckerhq.com/api/compliance-alerts", {
      method: "POST",
      headers: {
        origin: "https://truckerhq.com",
        "x-forwarded-for": `10.0.3.${++n}`,
        "content-type": "application/json",
      },
      body: raw ?? JSON.stringify(body),
    }),
  );
}

const valid = { dot: "1234567", phone: "(312) 555-0123", smsConsent: true };

beforeEach(() => {
  vi.mocked(insertRow).mockReset().mockResolvedValue(true);
  vi.mocked(notifyComplianceAlertsOn).mockReset();
});

describe("POST /api/compliance-alerts", () => {
  it("returns ok without saving when the honeypot is filled", async () => {
    const res = await post({ ...valid, website: "x" });
    expect(res.status).toBe(200);
    expect(insertRow).not.toHaveBeenCalled();
  });

  it("rejects an invalid phone with 400 and saves nothing", async () => {
    const res = await post({ ...valid, phone: "555-0123" });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Enter a valid US phone number" });
    expect(insertRow).not.toHaveBeenCalled();
  });

  it("stores and notifies with the E.164 phone", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(insertRow).toHaveBeenCalledWith(
      "compliance_alert_signups",
      expect.objectContaining({ phone: "+13125550123" }),
    );
    expect(notifyComplianceAlertsOn).toHaveBeenCalledWith("+13125550123", "1234567");
  });

  it("returns 502 and does not notify when saving fails", async () => {
    vi.mocked(insertRow).mockResolvedValue(false);
    const res = await post(valid);
    expect(res.status).toBe(502);
    expect(notifyComplianceAlertsOn).not.toHaveBeenCalled();
  });

  it("returns 400 for a malformed JSON body", async () => {
    const res = await post(null, "{not json");
    expect(res.status).toBe(400);
  });

  it("requires SMS consent", async () => {
    const res = await post({ ...valid, smsConsent: false });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "SMS consent required" });
    expect(insertRow).not.toHaveBeenCalled();
  });

  it.each(["abc", "123456789"])("rejects DOT %j with 400", async (dot) => {
    const res = await post({ ...valid, dot });
    expect(res.status).toBe(400);
    expect(insertRow).not.toHaveBeenCalled();
  });

  it("stores the DOT as digits only", async () => {
    await post({ ...valid, dot: "DOT 1234567" });
    expect(insertRow).toHaveBeenCalledWith(
      "compliance_alert_signups",
      expect.objectContaining({ dot: "1234567" }),
    );
  });

});
