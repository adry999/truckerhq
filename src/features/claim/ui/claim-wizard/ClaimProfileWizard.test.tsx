// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClaimProfileWizard } from "./ClaimProfileWizard";

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  fetchMock.mockReset();
  vi.unstubAllGlobals();
});

async function reachDetails() {
  await userEvent.click(screen.getByRole("radio", { name: /\(•••\) •••-4471/ }));
  await userEvent.click(screen.getByRole("button", { name: "Continue" }));
}

describe("ClaimProfileWizard", () => {
  it("keeps Continue disabled until a contact method is chosen", async () => {
    render(<ClaimProfileWizard />);
    expect(screen.getByRole("note")).toHaveTextContent("Demo: the carrier shown is a sample");
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
    await userEvent.click(screen.getByRole("radio", { name: /o•••@carpathianfreight.com/ }));
    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  it("submits the claim, posts the payload and focuses the confirmation", async () => {
    render(<ClaimProfileWizard />);
    await reachDetails();

    expect(screen.getByRole("heading", { name: "What brokers and drivers should see" })).toHaveFocus();
    expect(screen.getByText("Pending verification")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Dispatch phone"), "(555) 555-5555");
    await userEvent.click(screen.getByRole("checkbox", { name: "Reefer" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "We are hiring drivers" }));
    await userEvent.click(screen.getByRole("button", { name: "Submit claim" }));

    expect(await screen.findByRole("heading", { name: "Claim received" })).toHaveFocus();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/claim");
    expect(JSON.parse(init.body)).toEqual({
      dot: "3412897",
      carrierSlug: "carpathian-freight-3412897",
      contactMethod: "phone",
      phone: "(555) 555-5555",
      equipment: ["Dry van", "Reefer"],
      lanes: ["Midwest"],
      alsoShow: [
        "We speak Russian",
        "We are hiring drivers",
        "Looking for direct shippers and brokers",
      ],
      website: "",
    });
  });

  it("shows the server message when the claim is rejected", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "Phone number looks invalid" }), { status: 400 }),
    );
    render(<ClaimProfileWizard />);
    await reachDetails();
    await userEvent.click(screen.getByRole("button", { name: "Submit claim" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Phone number looks invalid");
    expect(screen.getByRole("button", { name: "Submit claim" })).toBeEnabled();
    expect(screen.queryByRole("heading", { name: "Claim received" })).not.toBeInTheDocument();
  });

  it("returns to the contact step with Back", async () => {
    render(<ClaimProfileWizard />);
    await reachDetails();
    await userEvent.click(screen.getByRole("button", { name: "← Back" }));
    expect(screen.getByRole("heading", { name: "Choose how we reach you" })).toHaveFocus();
    expect(screen.getByRole("radio", { name: /\(•••\) •••-4471/ })).toBeChecked();
  });
});
