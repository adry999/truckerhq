import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { resetServerEnvForTests } from "@/server/env";
import { sendLeadAlert } from "./lead-alert";

const fetchMock = vi.fn();
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubEnv("RESEND_API_KEY", "re_test");
  resetServerEnvForTests();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  logSpy.mockRestore();
  errorSpy.mockRestore();
  resetServerEnvForTests();
});

describe("sendLeadAlert", () => {
  it("emails every recipient a table with escaped values and a reply-to", async () => {
    vi.stubEnv("LEADS_NOTIFY_TO", "a@x.com, b@x.com");
    resetServerEnvForTests();
    await sendLeadAlert("Contact message", {
      name: "Ivan",
      email: "ivan@example.com",
      driver_count: 3,
      message: '<script>alert("x")</script> & more',
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body.to).toEqual(["a@x.com", "b@x.com"]);
    expect(body.reply_to).toBe("ivan@example.com");
    expect(body.subject).toBe("New lead: Contact message (Ivan)");
    expect(body.html).toContain("<th align=\"left\">Driver count</th><td>3</td>");
    expect(body.html).toContain("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; more");
    expect(body.html).not.toContain("<script>");
  });

  it("skips without calling Resend when LEADS_NOTIFY_TO is unset", async () => {
    await sendLeadAlert("Contact message", { name: "Ivan" });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("skipped"));
  });
});
