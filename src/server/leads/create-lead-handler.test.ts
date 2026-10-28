import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { z } from "zod";
import { resetRateLimitForTests } from "@/server/http/api-guard";
import { resetServerEnvForTests } from "@/server/env";
import { resetTurnstileWarningForTests } from "@/server/http/turnstile";
import { createLeadHandler } from "./create-lead-handler";
import { requiredText, text, usPhone, withChecks } from "./fields";

const schema = withChecks(
  z.object({
    name: requiredText(50, "Missing name"),
    phone: requiredText(30, "Missing name"),
    note: text(20),
  }),
  { phone: usPhone() },
);

function setup(
  overrides: { insertResult?: boolean; withNotify?: boolean; smsConsent?: boolean } = {},
) {
  const insertRow = vi.fn(async () => overrides.insertResult ?? true);
  const after = vi.fn((task: () => Promise<void>) => void task());
  const notify = vi.fn(async () => {});
  const alert = vi.fn(async () => {});
  const handler = createLeadHandler(
    {
      schema,
      table: "contact_messages",
      toRow: (d) => ({
        topic: "t",
        name: d.name,
        phone: d.phone,
        message: d.note,
        language: "EN",
      }),
      notify: overrides.withNotify === false ? undefined : notify,
      smsConsent: overrides.smsConsent,
      saveError: "Could not save",
      alertLabel: "Test lead",
    },
    { insertRow, after, alert },
  );
  return { handler, insertRow, after, notify, alert };
}

function post(body: string, headers: Record<string, string> = {}) {
  return new Request("https://truckerhq.com/api/test", {
    method: "POST",
    headers: { origin: "http://localhost:3000", "cf-connecting-ip": "9.9.9.9", ...headers },
    body,
  });
}

const valid = { name: "Ivan", phone: "(312) 555-0123", note: "hi" };

beforeEach(() => {
  resetRateLimitForTests();
  resetServerEnvForTests();
  resetTurnstileWarningForTests();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  resetServerEnvForTests();
});

describe("createLeadHandler", () => {
  it("saves and notifies with the parsed data on success", async () => {
    const { handler, insertRow, after, notify } = setup();
    const res = await handler(post(JSON.stringify(valid)));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(insertRow).toHaveBeenCalledWith("contact_messages", {
      topic: "t",
      name: "Ivan",
      phone: "+13125550123",
      message: "hi",
      language: "EN",
    });
    expect(after).toHaveBeenCalledTimes(2);
    expect(notify).toHaveBeenCalledWith({ name: "Ivan", phone: "+13125550123", note: "hi" });
  });

  it("schedules only the team alert when notify is not configured", async () => {
    const { handler, after, alert } = setup({ withNotify: false });
    expect((await handler(post(JSON.stringify(valid)))).status).toBe(200);
    expect(after).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledTimes(1);
  });

  it("sends the team alert with the label and the inserted row", async () => {
    const { handler, alert } = setup();
    await handler(post(JSON.stringify(valid)));
    expect(alert).toHaveBeenCalledWith("Test lead", {
      topic: "t",
      name: "Ivan",
      phone: "+13125550123",
      message: "hi",
      language: "EN",
    });
  });

  it("still responds ok when the alert fails", async () => {
    const { handler, alert } = setup();
    alert.mockRejectedValueOnce(new Error("boom"));
    const res = await handler(post(JSON.stringify(valid)));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("returns ok without saving when the honeypot is filled", async () => {
    const { handler, insertRow } = setup();
    const res = await handler(post(JSON.stringify({ ...valid, website: "spam" })));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(insertRow).not.toHaveBeenCalled();
  });

  it("returns 400 with the first issue message", async () => {
    const { handler, insertRow } = setup();
    const res = await handler(post(JSON.stringify({ phone: "bad" })));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Missing name",
      fields: { name: "Missing name" },
    });
    const res2 = await handler(post(JSON.stringify({ ...valid, phone: "555-0123" })));
    expect(await res2.json()).toEqual({
      error: "Enter a valid US phone number",
      fields: { phone: "Enter a valid US phone number" },
    });
    expect(insertRow).not.toHaveBeenCalled();
  });

  it("returns 413 for an oversized body", async () => {
    const { handler, insertRow } = setup();
    const res = await handler(post(JSON.stringify({ ...valid, note: "x".repeat(20_000) })));
    expect(res.status).toBe(413);
    expect(await res.json()).toEqual({ error: "Payload too large" });
    expect(insertRow).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid JSON", async () => {
    const { handler } = setup();
    const res = await handler(post("{not json"));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid request body" });
  });

  it.each(["[]", "null", '"text"', "42"])("returns 400 for non-object JSON %s", async (raw) => {
    const { handler, insertRow } = setup();
    const res = await handler(post(raw));
    expect(res.status).toBe(400);
    expect(insertRow).not.toHaveBeenCalled();
  });

  it("returns 502 and does not notify when saving fails", async () => {
    const { handler, after, alert } = setup({ insertResult: false });
    const res = await handler(post(JSON.stringify(valid)));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "Could not save" });
    expect(after).not.toHaveBeenCalled();
    expect(alert).not.toHaveBeenCalled();
  });

  it("applies the origin guard", async () => {
    const { handler } = setup();
    const res = await handler(post(JSON.stringify(valid), { origin: "https://evil.example.com" }));
    expect(res.status).toBe(403);
  });

  describe("turnstile", () => {
    const fetchMock = vi.fn();
    beforeEach(() => {
      fetchMock.mockReset();
      vi.stubGlobal("fetch", fetchMock);
      vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
      vi.spyOn(console, "error").mockImplementation(() => {});
    });
    const verdict = (body: object) =>
      fetchMock.mockResolvedValue(new Response(JSON.stringify(body), { status: 200 }));

    it("returns 403 and saves nothing when the token is missing", async () => {
      const { handler, insertRow } = setup();
      const res = await handler(post(JSON.stringify(valid)));
      expect(res.status).toBe(403);
      expect(await res.json()).toEqual({ error: "Verification failed" });
      expect(insertRow).not.toHaveBeenCalled();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("returns 403 when Cloudflare rejects the token", async () => {
      verdict({ success: false, "error-codes": ["invalid-input-response"] });
      const { handler, insertRow } = setup();
      const res = await handler(post(JSON.stringify({ ...valid, turnstileToken: "bad" })));
      expect(res.status).toBe(403);
      expect(insertRow).not.toHaveBeenCalled();
    });

    it("saves without the token in the row when verification passes", async () => {
      verdict({ success: true, hostname: "localhost" });
      const { handler, insertRow } = setup();
      const res = await handler(post(JSON.stringify({ ...valid, turnstileToken: "good" })));
      expect(res.status).toBe(200);
      const [, row] = insertRow.mock.calls[0]! as unknown as [string, Record<string, unknown>];
      expect(JSON.stringify(row)).not.toContain("good");
      expect(row).not.toHaveProperty("turnstileToken");
    });
  });

  describe("sms consent", () => {
    const consentBody = { ...valid, smsConsent: true, smsConsentVersion: "v1" };

    it("stores evidence and notifies when consent is given", async () => {
      const { handler, insertRow, notify } = setup({ smsConsent: true });
      const res = await handler(post(JSON.stringify(consentBody), { "user-agent": "UA/1" }));
      expect(res.status).toBe(200);
      expect(insertRow).toHaveBeenCalledWith(
        "contact_messages",
        expect.objectContaining({
          sms_consent: true,
          sms_consent_version: "v1",
          consent_ip: "9.9.9.9",
          consent_user_agent: "UA/1",
          sms_consent_at: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
        }),
      );
      expect(notify).toHaveBeenCalledTimes(1);
    });

    it("saves with empty evidence and does not notify without consent", async () => {
      const { handler, insertRow, notify, alert } = setup({ smsConsent: true });
      await handler(post(JSON.stringify(valid)));
      expect(insertRow).toHaveBeenCalledWith(
        "contact_messages",
        expect.objectContaining({
          sms_consent: false,
          sms_consent_version: null,
          sms_consent_at: null,
          consent_ip: null,
          consent_user_agent: null,
        }),
      );
      expect(notify).not.toHaveBeenCalled();
      expect(alert).toHaveBeenCalledTimes(1);
    });

    it("truncates the user agent to 300 characters", async () => {
      const { handler, insertRow } = setup({ smsConsent: true });
      await handler(post(JSON.stringify(consentBody), { "user-agent": "u".repeat(500) }));
      const [, row] = insertRow.mock.calls[0]! as unknown as [string, { consent_user_agent: string }];
      expect(row.consent_user_agent).toHaveLength(300);
    });
  });
});
