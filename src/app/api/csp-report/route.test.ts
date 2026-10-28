import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from "vitest";
import { POST } from "./route";
import { resetRateLimitForTests } from "@/server/http/api-guard";

let warn: MockInstance<typeof console.warn>;

beforeEach(() => {
  resetRateLimitForTests();
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => warn.mockRestore());

function post(body: unknown, type: string, ip = "10.9.0.1") {
  return POST(
    new Request("https://truckerhq.us/api/csp-report", {
      method: "POST",
      headers: { "content-type": type, "cf-connecting-ip": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

describe("POST /api/csp-report", () => {
  it("logs a legacy application/csp-report payload without query strings", async () => {
    const res = await post(
      {
        "csp-report": {
          "document-uri": "https://truckerhq.us/jobs?phone=3125550123",
          "violated-directive": "script-src-elem",
          "effective-directive": "script-src-elem",
          "blocked-uri": "https://evil.example/x.js?token=abc",
        },
      },
      "application/csp-report",
    );
    expect(res.status).toBe(204);
    expect(warn).toHaveBeenCalledTimes(1);
    const line = String(warn.mock.calls[0]![0]);
    expect(line).toBe(
      '[csp-report] directive="script-src-elem" blocked="https://evil.example" path="/jobs"',
    );
    expect(line).not.toContain("phone");
    expect(line).not.toContain("token");
  });

  it("logs each csp-violation in a Reporting API payload and skips other types", async () => {
    const res = await post(
      [
        {
          type: "csp-violation",
          body: {
            documentURL: "https://truckerhq.us/tools?q=secret",
            effectiveDirective: "img-src",
            blockedURL: "inline",
          },
        },
        { type: "deprecation", body: { id: "x" } },
        {
          type: "csp-violation",
          body: { effectiveDirective: "connect-src", blockedURL: "https://a.test/p?q=1" },
        },
      ],
      "application/reports+json",
    );
    expect(res.status).toBe(204);
    expect(warn.mock.calls.map((c) => String(c[0]))).toEqual([
      '[csp-report] directive="img-src" blocked="inline" path="/tools"',
      '[csp-report] directive="connect-src" blocked="https://a.test" path="-"',
    ]);
  });

  it("answers 204 and logs nothing for garbage or oversized bodies", async () => {
    expect((await post("not json", "application/csp-report")).status).toBe(204);
    expect((await post({ hello: 1 }, "application/csp-report")).status).toBe(204);
    const big = JSON.stringify({ "csp-report": { "blocked-uri": "x".repeat(20_000) } });
    expect((await post(big, "application/csp-report")).status).toBe(204);
    expect(warn).not.toHaveBeenCalled();
  });

  it("rate limits per IP but still answers 204", async () => {
    const body = { "csp-report": { "effective-directive": "img-src" } };
    for (let i = 0; i < 8; i++) {
      expect((await post(body, "application/csp-report")).status).toBe(204);
    }
    expect(warn).toHaveBeenCalledTimes(5);
  });
});
