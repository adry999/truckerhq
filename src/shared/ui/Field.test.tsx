// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Field, TextInput } from "./Field";

describe("Field", () => {
  it("links the hint and error to the control and flags it invalid", () => {
    render(
      <Field label="Phone" hint={<span>Digits only</span>} error="Enter a valid US phone number">
        <TextInput />
      </Field>,
    );
    const input = screen.getByLabelText("Phone");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Digits only Enter a valid US phone number");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid US phone number");
  });

  it("adds no aria wiring when there is neither hint nor error", () => {
    render(
      <Field label="Name">
        <TextInput />
      </Field>,
    );
    const input = screen.getByLabelText("Name");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("keeps hint and error out of the accessible name", () => {
    render(
      <Field label="Phone" hint="Digits only" error="Bad">
        <TextInput />
      </Field>,
    );
    expect(screen.getByRole("textbox", { name: "Phone" })).toBeInTheDocument();
  });
});
