import { describe, it, expect } from "vitest";
import { generateMetadata } from "./page";
import { GUIDES, hasGuideBody } from "@/features/guides";

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
