import { afterEach, describe, it, expect } from "vitest";
import { generateMetadata } from "./page";
import { GUIDES, findGuide, getGuideBody, hasGuideBody } from "@/features/guides";

const meta = (slug: string) => generateMetadata({ params: Promise.resolve({ slug }) });

describe("guide metadata", () => {
  it("noindexes stub guides", async () => {
    const stub = GUIDES.find((g) => !hasGuideBody(g))!;
    expect((await meta(stub.slug)).robots).toEqual({ index: false, follow: true });
  });

  it("leaves the written guide indexable", async () => {
    const written = GUIDES.find(hasGuideBody)!;
    expect((await meta(written.slug)).robots).toBeUndefined();
  });
});

describe("guide metadata for drafted bodies", () => {
  const slug = "when-to-turn-down-a-load";

  afterEach(() => {
    getGuideBody(findGuide(slug)!)!.reviewStatus = "draft";
  });

  it("keeps a draft guide noindex", async () => {
    expect((await meta(slug)).robots).toEqual({ index: false, follow: true });
  });

  it("makes an approved guide indexable", async () => {
    getGuideBody(findGuide(slug)!)!.reviewStatus = "approved";
    expect((await meta(slug)).robots).toBeUndefined();
  });
});
