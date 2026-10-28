// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DISPATCH_SERVICE_PAGES, findServicePage } from "@/features/dispatch/data/service-pages";
import { ServicePageView } from "./ServicePageView";

function renderPage(slug: string) {
  const page = findServicePage(slug);
  if (!page) throw new Error(`missing page ${slug}`);
  render(<ServicePageView page={page} />);
  return page;
}

describe("ServicePageView", () => {
  it("renders the h1, a breadcrumb back to /dispatch and every section heading", () => {
    const page = renderPage("flatbed");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(page.h1);
    expect(screen.getByRole("link", { name: "Dispatch" }).getAttribute("href")).toBe("/dispatch");
    for (const s of page.sections) {
      expect(screen.getByRole("heading", { level: 2, name: s.heading })).toBeTruthy();
    }
  });

  it("links to the start page and to the other service pages but not to itself", () => {
    renderPage("reefer");
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/dispatch/start");
    expect(hrefs).not.toContain("/dispatch/reefer");
    for (const p of DISPATCH_SERVICE_PAGES.filter((p) => p.slug !== "reefer")) {
      expect(hrefs).toContain(`/dispatch/${p.slug}`);
    }
  });

  it("links the new authority page to the New MC Checklist", () => {
    renderPage("new-authority");
    const link = screen.getByRole("link", { name: "New MC Checklist" });
    expect(link.getAttribute("href")).toBe("/tools/new-mc-checklist");
  });
});
