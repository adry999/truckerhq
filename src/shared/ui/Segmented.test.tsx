// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Segmented } from "./Segmented";

const OPTIONS = ["Dry van", "Reefer", "Flatbed"];

describe("Segmented", () => {
  it("is a radiogroup with the selected option checked", () => {
    render(<Segmented options={OPTIONS} value="Reefer" onChange={() => {}} label="Trailer" />);
    expect(screen.getByRole("radiogroup", { name: "Trailer" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Reefer" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Dry van" })).not.toBeChecked();
  });

  it("moves the selection with arrow keys and wraps around", async () => {
    const onChange = vi.fn();
    render(<Segmented options={OPTIONS} value="Flatbed" onChange={onChange} label="Trailer" />);
    screen.getByRole("radio", { name: "Flatbed" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("Dry van");
    await userEvent.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith("Reefer");
  });

  it("is a single tab stop on the selected option", () => {
    render(<Segmented options={OPTIONS} value="Reefer" onChange={() => {}} label="Trailer" />);
    expect(screen.getByRole("radio", { name: "Reefer" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("radio", { name: "Dry van" })).toHaveAttribute("tabindex", "-1");
  });
});
