// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AboutContactForm from "./AboutContactForm";

afterEach(() => vi.unstubAllGlobals());

async function fillAndSubmit() {
  await userEvent.click(screen.getByRole("button", { name: "RU" }));
  await userEvent.type(screen.getByLabelText(/^Name/), "Ann Driver");
  await userEvent.type(screen.getByLabelText(/^Phone/), "5551234567");
  await userEvent.click(screen.getByRole("button", { name: "Call me back" }));
}

describe("AboutContactForm", () => {
  it("posts the message and shows the success panel", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<AboutContactForm />);
    await fillAndSubmit();
    expect(await screen.findByText("Got it")).toBeInTheDocument();
    expect(screen.getByText(/call you in Russian shortly/)).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(init.body as string)).toEqual({
      topic: "Dispatch",
      name: "Ann Driver",
      phone: "5551234567",
      message: "",
      language: "RU",
      website: "",
    });
  });

  it("shows the server error message in the alert", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ error: "Enter a valid US phone number" }, { status: 400 })),
    );
    render(<AboutContactForm />);
    await fillAndSubmit();
    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a valid US phone number");
  });
});
