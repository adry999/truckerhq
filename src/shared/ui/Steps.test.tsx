// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Steps } from "./Steps";

const item = (n: number) => ({ number: String(n), title: `Step ${n}`, description: `Do ${n}` });

describe("Steps", () => {
  it("renders the steps as an ordered list with a connector between badges only", () => {
    const { container } = render(<Steps items={[1, 2, 3, 4].map(item)} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("Step 4")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-hidden]")).toHaveLength(3);
  });
});
