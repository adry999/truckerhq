// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NewMcChecklist } from "./NewMcChecklist";

describe("NewMcChecklist", () => {
  it("renders English headings and EN links by default", () => {
    render(<NewMcChecklist />);
    expect(screen.getByRole("heading", { level: 1, name: "New MC checklist" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tools" })).toHaveAttribute("href", "/tools");
    expect(screen.getByRole("link", { name: "See Starter MC" })).toHaveAttribute("href", "/dispatch");
  });

  it("renders Russian headings and FAQ when lang is RU", () => {
    render(<NewMcChecklist lang="RU" />);
    expect(screen.getByRole("heading", { level: 1, name: "Чек-лист для нового MC" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Что нужно до первого груза" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Вопросы про новый MC" })).toBeInTheDocument();
    expect(screen.queryByText("Before you haul")).not.toBeInTheDocument();
  });

  it("points Russian internal links at Russian routes", () => {
    render(<NewMcChecklist lang="RU" />);
    expect(screen.getByRole("link", { name: "Инструменты" })).toHaveAttribute("href", "/ru/tools");
    expect(screen.getByRole("link", { name: "Смотреть Starter MC" })).toHaveAttribute("href", "/ru/dispatch");
    expect(screen.getByRole("link", { name: "Уведомления, пока ничего не истекло" })).toHaveAttribute(
      "href",
      "/ru/tools/compliance-alerts",
    );
  });
});
