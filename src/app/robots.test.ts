import { describe, it, expect } from "vitest";
import robots from "./robots";

function rules() {
  const { rules } = robots();
  return Array.isArray(rules) ? rules : [rules];
}

describe("robots", () => {
  it("keeps noindex pages crawlable and blocks only the live carrier lookup", () => {
    const rule = rules().find((r) => r.userAgent === "*");
    expect(rule?.allow).toBe("/");
    expect(rule?.disallow).toEqual(["/tools/carrier-lookup?"]);
  });

  it.each([
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Bingbot",
  ])("gives %s its own group that allows the site and repeats the lookup disallow", (bot) => {
    const rule = rules().find((r) => r.userAgent === bot);
    expect(rule?.allow).toBe("/");
    expect(rule?.disallow).toEqual(["/tools/carrier-lookup?"]);
  });
});
