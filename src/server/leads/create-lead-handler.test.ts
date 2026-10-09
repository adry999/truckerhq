import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";
import { resetRateLimitForTests } from "@/server/http/api-guard";
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

function setup(overrides: { insertResult?: boolean; withNotify?: boolean } = {}) {
  const insertRow = vi.fn(async () => overrides.insertResult ?? true);
  const after = vi.fn((task: () => Promise<void>) => void task());
  const notify = vi.fn(async () => {});
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
      saveError: "Could not save",
    },
    { insertRow, after },
  );
  return { handler, insertRow, after, notify };
}

function post(body: string, headers: Record<string, string> = {}) {
  return new Request("https://truckerhq.com/api/test", {
    method: "POST",
    headers: { origin: "https://truckerhq.com", "x-real-ip": "9.9.9.9", ...headers },
    body,
  });
}

const valid = { name: "Ivan", phone: "(312) 555-0123", note: "hi" };

beforeEach(() => resetRateLimitForTests());

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
    expect(after).toHaveBeenCalledTimes(1);
    expect(notify).toHaveBeenCalledWith({ name: "Ivan", phone: "+13125550123", note: "hi" });
  });

  it("does not schedule anything when notify is not configured", async () => {
    const { handler, after } = setup({ withNotify: false });
    expect((await handler(post(JSON.stringify(valid)))).status).toBe(200);
    expect(after).not.toHaveBeenCalled();
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
    expect(await res.json()).toEqual({ error: "Missing name" });
    const res2 = await handler(post(JSON.stringify({ ...valid, phone: "555-0123" })));
    expect(await res2.json()).toEqual({ error: "Enter a valid US phone number" });
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
    const { handler, after } = setup({ insertResult: false });
    const res = await handler(post(JSON.stringify(valid)));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "Could not save" });
    expect(after).not.toHaveBeenCalled();
  });

  it("applies the origin guard", async () => {
    const { handler } = setup();
    const res = await handler(post(JSON.stringify(valid), { origin: "https://evil.example.com" }));
    expect(res.status).toBe(403);
  });
});
