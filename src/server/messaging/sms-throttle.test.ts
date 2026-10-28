import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { claimSmsSlot, claimSmsSlotInMemory, resetSmsThrottle } from "@/server/messaging/sms-throttle";
import { resetServerEnvForTests } from "@/server/env";

const T0 = 1_000_000;
const MIN = 60_000;
const phone = (i: number) => `+1312555${String(i).padStart(4, "0")}`;

beforeEach(resetSmsThrottle);

describe("claimSmsSlotInMemory", () => {
  it("blocks a second send to the same phone within 10 minutes", () => {
    expect(claimSmsSlotInMemory(phone(1), T0)).toBe(true);
    expect(claimSmsSlotInMemory(phone(1), T0 + 9 * MIN)).toBe(false);
  });

  it("allows the same phone again after 10 minutes", () => {
    expect(claimSmsSlotInMemory(phone(1), T0)).toBe(true);
    expect(claimSmsSlotInMemory(phone(1), T0 + 10 * MIN)).toBe(true);
  });

  it("blocks the 31st distinct phone within an hour", () => {
    for (let i = 0; i < 30; i++) expect(claimSmsSlotInMemory(phone(i), T0 + i * 1000)).toBe(true);
    expect(claimSmsSlotInMemory(phone(30), T0 + 31_000)).toBe(false);
  });

  it("resets the global cap after an hour", () => {
    for (let i = 0; i < 30; i++) claimSmsSlotInMemory(phone(i), T0);
    expect(claimSmsSlotInMemory(phone(99), T0 + 30 * MIN)).toBe(false);
    expect(claimSmsSlotInMemory(phone(99), T0 + 60 * MIN)).toBe(true);
  });
});

describe("claimSmsSlot with Supabase", () => {
  const fetchMock = vi.fn();
  const posts = () => fetchMock.mock.calls.filter(([, init]) => init?.method === "POST");

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("SUPABASE_URL", "https://x.supabase.co");
    vi.stubEnv("SUPABASE_SECRET_KEY", "sb_secret_x");
    resetServerEnvForTests();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    resetServerEnvForTests();
  });

  const reply = (perPhone: unknown[], global: unknown[]) =>
    fetchMock.mockImplementation(async (url: string, init?: RequestInit) => {
      if (init?.method === "POST") return new Response(null, { status: 201 });
      return new Response(JSON.stringify(String(url).includes("phone=") ? perPhone : global), { status: 200 });
    });

  it("allows and records a send when under both limits", async () => {
    reply([], [{ id: 1 }]);
    expect(await claimSmsSlot(phone(1), T0)).toBe(true);
    expect(posts()).toHaveLength(1);
  });

  it("denies when the phone was texted in the last 10 minutes", async () => {
    reply([{ id: 5 }], []);
    expect(await claimSmsSlot(phone(1), T0)).toBe(false);
    expect(posts()).toHaveLength(0);
  });

  it("denies when the global hourly cap is reached", async () => {
    reply([], Array.from({ length: 30 }, (_, i) => ({ id: i })));
    expect(await claimSmsSlot(phone(1), T0)).toBe(false);
    expect(posts()).toHaveLength(0);
  });

  it("falls back to the in-memory throttle when the query fails", async () => {
    fetchMock.mockImplementation(async () => new Response("boom", { status: 500 }));
    expect(await claimSmsSlot(phone(1), T0)).toBe(true);
    expect(await claimSmsSlot(phone(1), T0 + MIN)).toBe(false);
  });

  it("falls back to in-memory when Supabase is not configured", async () => {
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_ANON_KEY", "");
    resetServerEnvForTests();
    expect(await claimSmsSlot(phone(1), T0)).toBe(true);
    expect(await claimSmsSlot(phone(1), T0 + MIN)).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
