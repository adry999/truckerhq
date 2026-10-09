import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { resetServerEnvForTests } from "@/server/env";
import { insertRow } from "./insert-row";

const fetchMock = vi.fn();
let errorSpy: ReturnType<typeof vi.spyOn>;

const row = {
  topic: "t",
  name: "n",
  phone: "+13125550123",
  message: "m",
  language: "EN",
};

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  resetServerEnvForTests();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  errorSpy.mockRestore();
  resetServerEnvForTests();
});

describe("insertRow", () => {
  it("returns false and logs when Supabase is not configured", async () => {
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_ANON_KEY", "");
    expect(await insertRow("contact_messages", row)).toBe(false);
    expect(errorSpy).toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the row to PostgREST and returns true", async () => {
    vi.stubEnv("SUPABASE_URL", "https://proj.supabase.co");
    vi.stubEnv("SUPABASE_ANON_KEY", "anon-key");
    fetchMock.mockResolvedValue(new Response(null, { status: 201 }));

    expect(await insertRow("contact_messages", row)).toBe(true);

    const [url, init] = fetchMock.mock.calls[0]! as [string, RequestInit];
    expect(url).toBe("https://proj.supabase.co/rest/v1/contact_messages");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({
      apikey: "anon-key",
      Authorization: "Bearer anon-key",
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    });
    expect(JSON.parse(init.body as string)).toEqual(row);
  });

  it("returns false on an http failure", async () => {
    vi.stubEnv("SUPABASE_URL", "https://proj.supabase.co");
    vi.stubEnv("SUPABASE_ANON_KEY", "anon-key");
    fetchMock.mockResolvedValue(new Response("denied", { status: 401 }));
    expect(await insertRow("contact_messages", row)).toBe(false);
  });
});
