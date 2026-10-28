// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConsentBanner from "./ConsentBanner";

afterEach(() => localStorage.clear());

describe("ConsentBanner", () => {
  it("is a labelled region, not a dialog or live region", () => {
    render(<ConsentBanner onChoice={() => {}} />);
    const region = screen.getByRole("region", { name: "Cookie consent" });
    expect(region).not.toHaveAttribute("aria-live");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("reports the choice without writing storage itself", async () => {
    const onChoice = vi.fn();
    render(<ConsentBanner onChoice={onChoice} />);
    await userEvent.click(screen.getByRole("button", { name: "Accept" }));
    expect(onChoice).toHaveBeenCalledExactlyOnceWith("granted");
    expect(localStorage.getItem("chq_consent")).toBeNull();
  });

  it("pads the page while shown and releases it on unmount", () => {
    const { unmount } = render(<ConsentBanner onChoice={() => {}} />);
    expect(document.body.style.paddingBottom).toBe("0px");
    unmount();
    expect(document.body.style.paddingBottom).toBe("");
  });
});
