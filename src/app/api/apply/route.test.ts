import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/server", async (orig) => ({
  ...(await orig<typeof import("next/server")>()),
  after: (fn: () => unknown) => {
    void fn();
  },
}));
vi.mock("@/lib/supabase", () => ({ insertRow: vi.fn() }));
vi.mock("@/lib/notifications", () => ({ notifyApplication: vi.fn() }));

import { POST } from "./route";
import { insertRow } from "@/lib/supabase";
import { notifyApplication } from "@/lib/notifications";

let n = 0;
function post(body: unknown, raw?: string) {
  return POST(
    new Request("https://truckerhq.com/api/apply", {
      method: "POST",
      headers: {
        origin: "https://truckerhq.com",
        "x-forwarded-for": `10.0.1.${++n}`,
        "content-type": "application/json",
      },
      body: raw ?? JSON.stringify(body),
    }),
  );
}

const valid = { fullName: "Ivan P", phone: "(312) 555-0123", jobSlug: "some-job" };

beforeEach(() => {
  vi.mocked(insertRow).mockReset().mockResolvedValue(true);
  vi.mocked(notifyApplication).mockReset();
});

describe("POST /api/apply", () => {
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
      "job_applications",
      expect.objectContaining({ phone: "+13125550123" }),
    );
    expect(notifyApplication).toHaveBeenCalledWith("+13125550123", "some-job");
  });

  it("returns 502 and does not notify when saving fails", async () => {
    vi.mocked(insertRow).mockResolvedValue(false);
    const res = await post(valid);
    expect(res.status).toBe(502);
    expect(notifyApplication).not.toHaveBeenCalled();
  });

  it("returns 400 for a malformed JSON body", async () => {
    const res = await post(null, "{not json");
    expect(res.status).toBe(400);
  });

});
