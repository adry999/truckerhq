import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/server", async (orig) => ({
  ...(await orig<typeof import("next/server")>()),
  after: (fn: () => unknown) => {
    void fn();
  },
}));
vi.mock("@/lib/supabase", () => ({ insertRow: vi.fn() }));
vi.mock("@/lib/notifications", () => ({ notifyDispatchStart: vi.fn() }));

import { POST } from "./route";
import { insertRow } from "@/lib/supabase";
import { notifyDispatchStart } from "@/lib/notifications";

let n = 0;
function post(body: unknown, raw?: string) {
  return POST(
    new Request("https://truckerhq.com/api/dispatch-start", {
      method: "POST",
      headers: {
        origin: "https://truckerhq.com",
        "x-forwarded-for": `10.0.2.${++n}`,
        "content-type": "application/json",
      },
      body: raw ?? JSON.stringify(body),
    }),
  );
}

const valid = { name: "Ivan P", phone: "(312) 555-0123" };

beforeEach(() => {
  vi.mocked(insertRow).mockReset().mockResolvedValue(true);
  vi.mocked(notifyDispatchStart).mockReset();
});

describe("POST /api/dispatch-start", () => {
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
      "dispatch_requests",
      expect.objectContaining({ phone: "+13125550123" }),
    );
    expect(notifyDispatchStart).toHaveBeenCalledWith("+13125550123");
  });

  it("returns 502 and does not notify when saving fails", async () => {
    vi.mocked(insertRow).mockResolvedValue(false);
    const res = await post(valid);
    expect(res.status).toBe(502);
    expect(notifyDispatchStart).not.toHaveBeenCalled();
  });

  it("returns 400 for a malformed JSON body", async () => {
    const res = await post(null, "{not json");
    expect(res.status).toBe(400);
  });

  it("clamps trucks above 500 to 500", async () => {
    await post({ ...valid, trucks: 9999 });
    expect(insertRow).toHaveBeenCalledWith(
      "dispatch_requests",
      expect.objectContaining({ trucks: 500 }),
    );
  });

});
