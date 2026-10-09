// @vitest-environment jsdom
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckCard, ChoiceGroup, RadioCard } from "./choices";

function Radios() {
  const [value, setValue] = useState("a");
  return (
    <ChoiceGroup legend="Contact method">
      {["a", "b"].map((v) => (
        <RadioCard key={v} name="m" value={v} checked={value === v} onChange={setValue} title={`Option ${v}`} />
      ))}
    </ChoiceGroup>
  );
}

function Checks() {
  const [on, setOn] = useState(false);
  return <CheckCard name="c" checked={on} onChange={setOn} title="Texas" />;
}

describe("choice cards", () => {
  it("groups radio cards under a named group and moves selection on click", async () => {
    render(<Radios />);
    expect(screen.getByRole("group", { name: "Contact method" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Option a" })).toBeChecked();
    await userEvent.click(screen.getByText("Option b"));
    expect(screen.getByRole("radio", { name: "Option b" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Option a" })).not.toBeChecked();
  });

  it("moves selection with the arrow keys", async () => {
    render(<Radios />);
    screen.getByRole("radio", { name: "Option a" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Option b" })).toBeChecked();
  });

  it("toggles a check card", async () => {
    render(<Checks />);
    const box = screen.getByRole("checkbox", { name: "Texas" });
    expect(box).not.toBeChecked();
    await userEvent.click(box);
    expect(box).toBeChecked();
    await userEvent.click(box);
    expect(box).not.toBeChecked();
  });
});
