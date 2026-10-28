// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { GuideBody } from "@/features/guides/ui/GuideBody";
import type { GuideBodyData } from "@/features/guides/data/guide-body";

const body: GuideBodyData = {
  reviewStatus: "draft",
  summary: "Direct answer.",
  sections: [
    {
      heading: "Section one",
      blocks: [
        { type: "p", text: "See [the calculator](/tools/profit-per-mile)." },
        { type: "table", head: ["A", "B"], rows: [["x", "y"]] },
      ],
    },
  ],
  faqs: [{ q: "Question?", a: "Answer." }],
  sources: [{ label: "FMCSA", url: "https://www.fmcsa.dot.gov/" }],
};

describe("GuideBody", () => {
  it("shows the draft banner only for drafts", () => {
    const { rerender } = render(<GuideBody body={body} draft />);
    expect(screen.getByText(/Draft — pending review/)).toBeTruthy();
    rerender(<GuideBody body={body} draft={false} />);
    expect(screen.queryByText(/Draft — pending review/)).toBeNull();
  });

  it("renders headings, scoped table headers, internal links and noopener sources", () => {
    render(<GuideBody body={body} draft={false} />);
    expect(screen.getByRole("heading", { name: "Section one" })).toBeTruthy();
    expect(screen.getAllByRole("columnheader").length).toBe(2);
    expect(screen.getByRole("link", { name: "the calculator" }).getAttribute("href")).toBe("/tools/profit-per-mile");
    expect(screen.getByRole("link", { name: "FMCSA" }).getAttribute("rel")).toBe("noopener");
  });
});
