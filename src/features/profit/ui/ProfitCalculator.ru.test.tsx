// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfitCalculator } from "./ProfitCalculator";

async function setField(label: string, value: string) {
  const input = screen.getByLabelText(new RegExp(`^${label}`));
  await userEvent.clear(input);
  await userEvent.type(input, value);
}

describe("ProfitCalculator in Russian", () => {
  it("renders every input with a Russian label", () => {
    render(<ProfitCalculator lang="RU" />);
    for (const label of ["Оплата за груз", "Мили с грузом", "Мили deadhead", "Цена дизеля", "Расход топлива", "Миль в неделю"]) {
      expect(screen.getByLabelText(new RegExp(`^${label}`))).toBeInTheDocument();
    }
    expect(screen.queryByLabelText(/^Load pay/)).not.toBeInTheDocument();
  });

  it("shows the example profit per mile with a Russian verdict and US number formatting", () => {
    render(<ProfitCalculator lang="RU" />);
    expect(screen.getByText("$0.78")).toBeInTheDocument();
    expect(screen.getByText("ХОРОШИЙ ГРУЗ")).toBeInTheDocument();
    expect(screen.getByText("Постоянные расходы (1,120 mi)")).toBeInTheDocument();
  });

  it("flags a losing load in Russian and resets to the example", async () => {
    render(<ProfitCalculator lang="RU" />);
    await setField("Оплата за груз", "1000");
    expect(screen.getByText("ГРУЗ В МИНУС")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Вернуть пример" }));
    expect(screen.getByText("ХОРОШИЙ ГРУЗ")).toBeInTheDocument();
  });

  it("links to the Russian dispatch page from the percentage card", () => {
    render(<ProfitCalculator lang="RU" />);
    expect(screen.getByRole("link", { name: "Диспетчинг с фиксированной ценой" })).toHaveAttribute("href", "/ru/dispatch");
  });
});
