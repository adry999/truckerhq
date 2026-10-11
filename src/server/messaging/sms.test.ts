import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { resetServerEnvForTests } from "@/server/env";
import { sendSms } from "./sms";

const fetchMock = vi.fn();
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;

function configure() {
  vi.stubEnv("TWILIO_ACCOUNT_SID", "ACtest");
  vi.stubEnv("TWILIO_AUTH_TOKEN", "token");
  vi.stubEnv("TWILIO_FROM", "+15550001111");
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  resetServerEnvForTests();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  logSpy.mockRestore();
  errorSpy.mockRestore();
  resetServerEnvForTests();
});

describe("sendSms", () => {
  it("no-ops with a masked log when Twilio is not configured", async () => {
    vi.stubEnv("TWILIO_ACCOUNT_SID", "");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "");
    vi.stubEnv("TWILIO_FROM", "");
    await sendSms("+13125550123", "hi");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(logSpy.mock.calls.join(" ")).toContain("***0123");
    expect(logSpy.mock.calls.join(" ")).not.toContain("3125550123");
  });

  it("sends a form-encoded message with Basic auth", async () => {
    configure();
    fetchMock.mockResolvedValue(new Response("{}", { status: 201 }));
    await sendSms("+13125550123", "hello there");

    const [url, init] = fetchMock.mock.calls[0]! as [string, RequestInit];
    expect(url).toBe("https://api.twilio.com/2010-04-01/Accounts/ACtest/Messages.json");
    expect(init.method).toBe("POST");
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe(`Basic ${Buffer.from("ACtest:token").toString("base64")}`);
    expect(headers["Content-Type"]).toBe("application/x-www-form-urlencoded");
    const params = init.body as URLSearchParams;
    expect(params.get("From")).toBe("+15550001111");
    expect(params.get("To")).toBe("+13125550123");
    expect(params.get("Body")).toBe("hello there");
  });

  it("does not throw when the request fails", async () => {
    configure();
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    await expect(sendSms("+13125550123", "hi")).resolves.toBeUndefined();
    fetchMock.mockResolvedValue(new Response("bad", { status: 400 }));
    await expect(sendSms("+13125550123", "hi")).resolves.toBeUndefined();
    expect(errorSpy).toHaveBeenCalled();
  });
});
