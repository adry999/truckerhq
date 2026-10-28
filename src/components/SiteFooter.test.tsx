// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SiteFooter from "./SiteFooter";

describe("SiteFooter", () => {
  it("is English by default", () => {
    render(<SiteFooter />);
    expect(screen.getByText("SERVICES")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dispatch" })).toHaveAttribute("href", "/dispatch");
    expect(screen.getByRole("link", { name: "Privacy" })).toBeInTheDocument();
  });

  it("is Russian on RU pages, linking RU pages where they exist and EN URLs otherwise", () => {
    render(<SiteFooter lang="RU" />);
    expect(screen.getByText("УСЛУГИ")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Диспетчинг" })).toHaveAttribute("href", "/ru/dispatch");
    expect(screen.getByRole("link", { name: "Работа для водителей" })).toHaveAttribute("href", "/ru/jobs");
    expect(screen.getByRole("link", { name: "Найм водителей" })).toHaveAttribute("href", "/hire-drivers");
    expect(screen.getByRole("link", { name: "Условия SMS" })).toHaveAttribute("href", "/sms-terms");
    expect(screen.getByText(/Данные о перевозчиках/)).toBeInTheDocument();
    expect(screen.queryByText("SERVICES")).not.toBeInTheDocument();
  });
});
