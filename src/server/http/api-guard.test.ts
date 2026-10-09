import { describe, it, expect } from "vitest";
import { str, isHoneypotTripped, isAllowedOrigin, isTooLarge, getClientIp, isRateLimited } from "./api-guard";

describe("str", () => {
  it("trims and caps length", () => {
    expect(str("  hello  ", 10)).toBe("hello");
    expect(str("a very long string", 5)).toBe("a ver");
  });

  it("returns empty string for non-string input", () => {
    expect(str(undefined, 10)).toBe("");
    expect(str(null, 10)).toBe("");
    expect(str(123, 10)).toBe("");
    expect(str({}, 10)).toBe("");
    expect(str(["x"], 10)).toBe("");
  });
});

describe("isHoneypotTripped", () => {
  it("is true only when website is a non-empty string", () => {
    expect(isHoneypotTripped({ website: "spam" })).toBe(true);
    expect(isHoneypotTripped({ website: "  spam  " })).toBe(true);
  });

  it("is false when website is empty, whitespace, missing, or not a string", () => {
    expect(isHoneypotTripped({ website: "" })).toBe(false);
    expect(isHoneypotTripped({ website: "   " })).toBe(false);
    expect(isHoneypotTripped({})).toBe(false);
    expect(isHoneypotTripped(null)).toBe(false);
    expect(isHoneypotTripped({ website: 123 })).toBe(false);
  });
});

describe("isAllowedOrigin", () => {
  it("allows requests with no Origin header (non-browser clients)", () => {
    const req = new Request("https://truckerhq.com/api/contact", { method: "POST" });
    expect(isAllowedOrigin(req)).toBe(true);
  });

  it("allows the site's own origins", () => {
    const req = new Request("https://truckerhq.com/api/contact", {
      method: "POST",
      headers: { origin: "https://truckerhq.com" },
    });
    expect(isAllowedOrigin(req)).toBe(true);
  });

  it("rejects a cross-site Origin", () => {
    const req = new Request("https://truckerhq.com/api/contact", {
      method: "POST",
      headers: { origin: "https://evil.example.com" },
    });
    expect(isAllowedOrigin(req)).toBe(false);
  });
});

describe("isTooLarge", () => {
  it("rejects bodies over the cap and allows bodies under it", () => {
    const big = new Request("https://truckerhq.com/api/contact", {
      method: "POST",
      headers: { "content-length": "20000" },
    });
    const small = new Request("https://truckerhq.com/api/contact", {
      method: "POST",
      headers: { "content-length": "100" },
    });
    expect(isTooLarge(big)).toBe(true);
    expect(isTooLarge(small)).toBe(false);
  });

  it("allows requests with no content-length header", () => {
    const req = new Request("https://truckerhq.com/api/contact", { method: "POST" });
    expect(isTooLarge(req)).toBe(false);
  });
});

describe("getClientIp", () => {
  it("takes the first address from x-forwarded-for", () => {
    const req = new Request("https://truckerhq.com/api/contact", {
      headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip, then 'unknown'", () => {
    const withRealIp = new Request("https://truckerhq.com/api/contact", {
      headers: { "x-real-ip": "9.9.9.9" },
    });
    expect(getClientIp(withRealIp)).toBe("9.9.9.9");
    expect(getClientIp(new Request("https://truckerhq.com/api/contact"))).toBe("unknown");
  });
});

describe("isRateLimited", () => {
  it("allows the first few requests then blocks the rest within the window", () => {
    const key = `test-key-${Math.random()}`;
    const results = Array.from({ length: 8 }, () => isRateLimited(key));
    expect(results.slice(0, 5)).toEqual([false, false, false, false, false]);
    expect(results.slice(5)).toEqual([true, true, true]);
  });

  it("tracks distinct keys independently", () => {
    const a = `key-a-${Math.random()}`;
    const b = `key-b-${Math.random()}`;
    expect(isRateLimited(a)).toBe(false);
    expect(isRateLimited(b)).toBe(false);
  });
});
