// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

import {
  SiteHeaderMobileMenuButton,
  SiteHeaderMobileMenuPanel,
  SiteHeaderMobileMenuProvider,
} from "./SiteHeaderMobileMenu";

function Menu() {
  return (
    <SiteHeaderMobileMenuProvider>
      <SiteHeaderMobileMenuButton />
      <SiteHeaderMobileMenuPanel
        items={[{ href: "/jobs", label: "Jobs" }]}
        startHref="/dispatch/start"
        startLabel="Get started"
        callLabel="Call 24/7"
      />
    </SiteHeaderMobileMenuProvider>
  );
}

describe("mobile menu", () => {
  it("closes on Escape and returns focus to the toggle", async () => {
    render(<Menu />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it("closes when the route changes", async () => {
    pathname = "/";
    const { rerender } = render(<Menu />);
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
    pathname = "/jobs";
    rerender(<Menu />);
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("does not claim a popup menu", () => {
    render(<Menu />);
    expect(screen.getByRole("button", { name: "Menu" })).not.toHaveAttribute("aria-haspopup");
  });
});
