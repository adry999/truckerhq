// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StepProgress } from "./StepProgress";

const STEPS = ["Truck", "Lanes", "Call"];

describe("StepProgress", () => {
  it("marks the active step and announces it", () => {
    render(<StepProgress steps={STEPS} current={1} />);
    const items = screen.getAllByRole("listitem");
    expect(items[1]).toHaveAttribute("aria-current", "step");
    expect(items[0]).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("status")).toHaveTextContent("Step 2 of 3: Lanes");
  });

  it("lets completed steps jump back only when onSelect is given", async () => {
    const onSelect = vi.fn();
    const { rerender } = render(<StepProgress steps={STEPS} current={2} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button", { name: "Truck" }));
    expect(onSelect).toHaveBeenCalledWith(0);
    expect(screen.queryByRole("button", { name: "Lanes" })).toBeInTheDocument();
    rerender(<StepProgress steps={STEPS} current={2} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("disables jumping and reports completion past the last step", () => {
    render(<StepProgress steps={STEPS} current={3} onSelect={() => {}} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("All steps complete");
  });
});
