// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingPage } from "./PricingPage";
import { PRICING_COPY } from "./pricing-copy";

describe("PricingPage", () => {
  it("shows the English heading, every dispatch package and the pricing FAQ", () => {
    render(<PricingPage lang="EN" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "One flat weekly price per truck" }),
    ).toBeInTheDocument();
    for (const name of ["Starter MC", "Owner-Operator Flat", "Fleet", "Web & Brand"]) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    }
    expect(screen.getByText("When am I billed?")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Start dispatch/ })[0]).toHaveAttribute("href", "/dispatch/start");
  });

  it("shows the Russian heading and sends every start link to the Russian wizard", () => {
    render(<PricingPage lang="RU" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Одна фиксированная цена за грузовик в неделю" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Когда я плачу?")).toBeInTheDocument();
    const start = screen.getAllByRole("link", { name: /Начать диспетчинг/ });
    expect(start.length).toBeGreaterThan(0);
    for (const link of start) expect(link).toHaveAttribute("href", "/ru/dispatch/start");
    expect(screen.getByRole("link", { name: /на английском/ })).toHaveAttribute("href", "/hire-drivers");
  });

  it("asks each FAQ question once per language", () => {
    for (const lang of ["EN", "RU"] as const) {
      const questions = PRICING_COPY[lang].faq.map((f) => f.q);
      expect(new Set(questions).size).toBe(questions.length);
      expect(questions.length).toBeGreaterThanOrEqual(6);
    }
  });
});
