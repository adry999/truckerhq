import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { httpRequest } from "./http-request";

const fetchMock = vi.fn();
let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllGlobals();
  errorSpy.mockRestore();
});

const logged = () => errorSpy.mock.calls.map((c: unknown[]) => c.join(" ")).join("\n");

describe("httpRequest", () => {
  it("returns status and text on success", async () => {
    fetchMock.mockResolvedValue(new Response("hello", { status: 201 }));
    expect(await httpRequest("svc", "https://x.test/a", { method: "POST" })).toEqual({
      ok: true,
      status: 201,
      text: "hello",
    });
    expect(errorSpy).not.toHaveBeenCalled();
    const init = fetchMock.mock.calls[0]![1] as RequestInit;
    expect(init.method).toBe("POST");
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("reports non-2xx as an http failure with status", async () => {
    fetchMock.mockResolvedValue(new Response("nope", { status: 500 }));
    expect(await httpRequest("svc", "https://x.test/a", {})).toEqual({
      ok: false,
      kind: "http",
      status: 500,
    });
    expect(logged()).toContain("[svc] http 500 nope");
  });

  it("reports a TimeoutError as a timeout", async () => {
    const err = new Error("timed out");
    err.name = "TimeoutError";
    fetchMock.mockRejectedValue(err);
    expect(await httpRequest("svc", "https://x.test/a", {})).toEqual({ ok: false, kind: "timeout" });
    expect(logged()).toContain("[svc] timeout");
  });

  it("reports other errors as network failures without throwing", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    expect(await httpRequest("svc", "https://x.test/a", {})).toEqual({ ok: false, kind: "network" });
    expect(logged()).toContain("[svc] network");
  });

  it("redacts long digit runs and caps the logged body", async () => {
    const body = `bad number 3125550123 ${"x".repeat(500)}`;
    fetchMock.mockResolvedValue(new Response(body, { status: 400 }));
    await httpRequest("svc", "https://x.test/a", {});
    const line = logged();
    expect(line).toContain("[redacted]");
    expect(line).not.toContain("3125550123");
    expect(line.length).toBeLessThan(260);
  });

  it("never logs the URL", async () => {
    fetchMock.mockResolvedValue(new Response("", { status: 500 }));
    await httpRequest("svc", "https://x.test/a?webKey=SECRET", {});
    fetchMock.mockRejectedValue(new TypeError("fetch failed for https://x.test/a?webKey=SECRET"));
    await httpRequest("svc", "https://x.test/a?webKey=SECRET", {});
    expect(logged()).not.toContain("SECRET");
  });
});
