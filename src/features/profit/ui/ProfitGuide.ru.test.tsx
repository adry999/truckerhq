// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfitGuide } from "./ProfitGuide";

describe("ProfitGuide in Russian", () => {
  it("renders the Russian heading, update date and the same profit per mile", () => {
    render(<ProfitGuide lang="RU" />);
    expect(screen.getByRole("heading", { level: 2, name: "Как посчитать прибыль на милю" })).toBeTruthy();
    expect(screen.getByText("Обновлено: октябрь 2026")).toBeTruthy();
    expect(screen.getByText("Прибыль на милю: $0.78/mi")).toBeTruthy();
  });

  it("renders the Russian FAQ", () => {
    render(<ProfitGuide lang="RU" />);
    expect(screen.getByText("Считаются ли мили deadhead?")).toBeTruthy();
  });
});
