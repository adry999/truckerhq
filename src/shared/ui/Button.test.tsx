// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a link when given an href", () => {
    render(<Button href="/jobs">Find jobs</Button>);
    expect(screen.getByRole("link", { name: "Find jobs" })).toHaveAttribute("href", "/jobs");
  });

  it("renders a non-submitting button by default", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button", { name: "Go" })).toHaveAttribute("type", "button");
  });

  it("allows submit type and appends className", () => {
    render(
      <Button type="submit" className="w-full">
        Send
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Send" });
    expect(btn).toHaveAttribute("type", "submit");
    expect(btn).toHaveClass("w-full");
  });
});
