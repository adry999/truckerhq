// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToolsHub } from "./ToolsHub";

describe("ToolsHub", () => {
  it("links the English tools to English routes", () => {
    render(<ToolsHub lang="EN" />);
    expect(screen.getByRole("heading", { level: 1, name: "Carrier tools" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Profit per mile/ })).toHaveAttribute("href", "/tools/profit-per-mile");
  });

  it("links the Russian tools to Russian routes and keeps carrier lookup on the English route", () => {
    render(<ToolsHub lang="RU" />);
    expect(screen.getByRole("heading", { level: 1, name: "Инструменты для перевозчиков" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Прибыль на милю/ })).toHaveAttribute("href", "/ru/tools/profit-per-mile");
    expect(screen.getByRole("link", { name: /Compliance-алерты/ })).toHaveAttribute("href", "/ru/tools/compliance-alerts");
    expect(screen.getByRole("link", { name: /Чеклист для нового MC/ })).toHaveAttribute("href", "/ru/tools/new-mc-checklist");
    expect(screen.getByRole("link", { name: /Проверить брокера/ })).toHaveAttribute("href", "/tools/carrier-lookup");
    expect(screen.getByText("Поиск работает на английском")).toBeInTheDocument();
  });
});
