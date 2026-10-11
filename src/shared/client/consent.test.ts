// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

async function load() {
  vi.resetModules();
  return import("./consent");
}

function setGpc(value: boolean | undefined) {
  Object.defineProperty(navigator, "globalPrivacyControl", { value, configurable: true });
}

beforeEach(() => {
  localStorage.clear();
  setGpc(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("consent store", () => {
  it("returns denied under Global Privacy Control regardless of storage", async () => {
    localStorage.setItem("chq_consent", "granted");
    setGpc(true);
    const { getConsentSnapshot } = await load();
    expect(getConsentSnapshot()).toBe("denied");
  });

  it("reads a stored granted value", async () => {
    localStorage.setItem("chq_consent", "granted");
    const { getConsentSnapshot } = await load();
    expect(getConsentSnapshot()).toBe("granted");
  });

  it("treats an unknown stored value as no choice", async () => {
    localStorage.setItem("chq_consent", "maybe");
    const { getConsentSnapshot } = await load();
    expect(getConsentSnapshot()).toBeNull();
  });

  it("returns null when storage throws on read", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const { getConsentSnapshot } = await load();
    expect(getConsentSnapshot()).toBeNull();
  });

  it("setConsent updates the snapshot and notifies listeners when storage throws", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const { getConsentSnapshot, setConsent, subscribeConsent } = await load();
    const listener = vi.fn();
    subscribeConsent(listener);
    expect(getConsentSnapshot()).toBeNull();
    setConsent("granted");
    expect(getConsentSnapshot()).toBe("granted");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("persists the choice to localStorage", async () => {
    const { setConsent } = await load();
    setConsent("denied");
    expect(localStorage.getItem("chq_consent")).toBe("denied");
  });

  it("stops notifying after unsubscribe", async () => {
    const { setConsent, subscribeConsent } = await load();
    const listener = vi.fn();
    const unsubscribe = subscribeConsent(listener);
    setConsent("granted");
    unsubscribe();
    setConsent("denied");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("server snapshot is null", async () => {
    const { getConsentServerSnapshot } = await load();
    expect(getConsentServerSnapshot()).toBeNull();
  });
});
