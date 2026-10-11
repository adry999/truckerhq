// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import NotFoundContent from "./NotFoundContent";
import ErrorContent from "./ErrorContent";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

// The header repeats some nav labels, so look for exits inside the page body.
function exits() {
  const body = screen.getByRole("heading", { level: 1 }).closest("section");
  if (!body) throw new Error("status section not found");
  return within(body);
}

describe("NotFoundContent", () => {
  it("shows the English heading and exits by default", () => {
    render(<NotFoundContent />);
    expect(screen.getByRole("heading", { level: 1, name: "Road closed" })).toBeInTheDocument();
    expect(exits().getByRole("link", { name: "Carrier Lookup" })).toHaveAttribute(
      "href",
      "/tools/carrier-lookup",
    );
    expect(exits().getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("shows the Russian heading and Russian exits for lang RU", () => {
    render(<NotFoundContent lang="RU" />);
    expect(screen.getByRole("heading", { level: 1, name: "Дорога закрыта" })).toBeInTheDocument();
    expect(screen.queryByText("Road closed")).not.toBeInTheDocument();
    expect(exits().getByRole("link", { name: "Главная" })).toHaveAttribute("href", "/ru");
    expect(exits().getByRole("link", { name: "Диспетчинг" })).toHaveAttribute("href", "/ru/dispatch");
    expect(exits().getByRole("link", { name: "Работа CDL" })).toHaveAttribute("href", "/ru/jobs");
    expect(exits().getByRole("link", { name: "Проверка перевозчика" })).toHaveAttribute(
      "href",
      "/tools/carrier-lookup",
    );
  });
});

describe("ErrorContent", () => {
  it("shows the English heading by default", () => {
    render(<ErrorContent retry={() => {}} />);
    expect(screen.getByRole("heading", { level: 1, name: "Roadside issue" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });

  it("shows the Russian heading, retry button and home link for lang RU", () => {
    render(<ErrorContent lang="RU" digest="abc123" retry={() => {}} />);
    expect(screen.getByRole("heading", { level: 1, name: "Проблема на трассе" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Повторить" })).toBeInTheDocument();
    expect(screen.getByText(/Код ошибки: abc123/)).toBeInTheDocument();
  });
});
