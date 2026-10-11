// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqList } from "./FaqList";

const ITEMS = [
  { q: "How much does it cost?", a: "One flat price per week." },
  { q: "Is there a contract?", a: "No, week to week." },
];

describe("FaqList", () => {
  it("renders one details element per item", () => {
    const { container } = render(<FaqList items={ITEMS} />);
    expect(container.querySelectorAll("details")).toHaveLength(2);
  });

  it("puts the question in the summary and the answer in the body", () => {
    const { container } = render(<FaqList items={ITEMS} />);
    const first = container.querySelector("details") as HTMLDetailsElement;
    expect(first.querySelector("summary")).toHaveTextContent("How much does it cost?");
    expect(screen.getByText("One flat price per week.")).toBeInTheDocument();
    expect(first).toContainElement(screen.getByText("One flat price per week."));
  });

  it("renders nothing inside the list when there are no items", () => {
    const { container } = render(<FaqList items={[]} />);
    expect(container.querySelectorAll("details")).toHaveLength(0);
  });
});
