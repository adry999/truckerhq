// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { JOBS } from "@/features/jobs/data/jobs";
import { RussianSpeakingJobs } from "./RussianSpeakingJobs";

describe("RussianSpeakingJobs", () => {
  it("renders the h1 and a link to the Russian jobs page", () => {
    render(<RussianSpeakingJobs carrierScore={() => 80} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Russian-speaking");
    const ru = screen.getByRole("link", { name: "Читать на русском" });
    expect(ru.getAttribute("href")).toBe("/ru/jobs");
    expect(screen.getByRole("link", { name: "All CDL jobs" }).getAttribute("href")).toBe("/jobs");
  });

  it("lists only jobs with Russian-speaking staff", () => {
    render(<RussianSpeakingJobs carrierScore={() => 80} />);
    for (const j of JOBS) {
      const link = document.querySelector(`a[href="/jobs/${j.slug}"]`);
      expect(link !== null, j.slug).toBe(j.russian);
    }
  });

  it("points owner-operators to both dispatch pages", () => {
    render(<RussianSpeakingJobs carrierScore={() => 80} />);
    expect(screen.getByRole("link", { name: "Dispatch for owner-operators" }).getAttribute("href")).toBe("/dispatch");
    expect(screen.getByRole("link", { name: "Диспетчер на русском" }).getAttribute("href")).toBe("/ru/dispatch");
  });
});
