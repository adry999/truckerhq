import { afterEach, describe, expect, it, vi } from "vitest";
import { postJson } from "./post-json";

function stubFetch(impl: () => Promise<Response>) {
  vi.stubGlobal("fetch", vi.fn(impl));
}

afterEach(() => vi.unstubAllGlobals());

describe("postJson", () => {
  it("resolves ok for a 2xx response", async () => {
    stubFetch(async () => new Response("{}", { status: 200 }));
    expect(await postJson("/api/x", { a: 1 })).toEqual({ ok: true });
  });

  it("surfaces the server error message on a 400", async () => {
    stubFetch(async () => Response.json({ error: "Enter a valid US phone number" }, { status: 400 }));
    expect(await postJson("/api/x", {})).toEqual({
      ok: false,
      status: 400,
      message: "Enter a valid US phone number",
    });
  });

  it("hides the message on a 5xx so the UI shows generic copy", async () => {
    stubFetch(async () => Response.json({ error: "upstream exploded" }, { status: 502 }));
    expect(await postJson("/api/x", {})).toEqual({ ok: false, status: 502, message: null });
  });

  it("reports a null status when the network fails", async () => {
    stubFetch(async () => {
      throw new TypeError("Failed to fetch");
    });
    expect(await postJson("/api/x", {})).toEqual({ ok: false, status: null, message: null });
  });

  it("tolerates a non-JSON error body", async () => {
    stubFetch(async () => new Response("nope", { status: 429 }));
    expect(await postJson("/api/x", {})).toEqual({ ok: false, status: 429, message: null });
  });
});
