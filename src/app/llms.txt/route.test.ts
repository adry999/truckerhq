import { describe, it, expect, vi, afterEach } from "vitest";

async function loadGet(indexable: boolean) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_INDEXABLE", indexable ? "true" : "false");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.test");
  return (await import("./route")).GET;
}

afterEach(() => vi.unstubAllEnvs());

describe("GET /llms.txt", () => {
  it("returns 404 when the site is not indexable", async () => {
    const GET = await loadGet(false);
    expect((await GET()).status).toBe(404);
  });

  it("serves markdown as text/plain with absolute links built from the site URL", async () => {
    const GET = await loadGet(true);
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/plain");
    const body = await res.text();
    expect(body.startsWith("# Trucker HQ\n\n> ")).toBe(true);
    expect(body).toContain("(https://example.test/dispatch)");
    expect(body).toContain("(https://example.test/ru/dispatch)");
  });

  it("lists only guides that have a body", async () => {
    const GET = await loadGet(true);
    const body = await (await GET()).text();
    const { GUIDES, hasGuideBody } = await import("@/features/guides");
    for (const g of GUIDES) {
      expect(body.includes(`/guides/${g.slug})`)).toBe(hasGuideBody(g));
    }
  });
});
