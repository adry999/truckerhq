// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplyForm from "./ApplyForm";

afterEach(() => vi.unstubAllGlobals());

async function fillAndSubmit() {
  await userEvent.type(screen.getByLabelText(/^Full name/), "Ann Driver");
  await userEvent.type(screen.getByLabelText(/^Phone/), "5551234567");
  await userEvent.selectOptions(screen.getByLabelText("Experience"), "5+ yrs");
  await userEvent.click(screen.getByRole("button", { name: "Send application" }));
}

describe("ApplyForm", () => {
  it("posts the application and shows the success panel", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ApplyForm jobSlug="acme-otr" />);
    await fillAndSubmit();
    expect(await screen.findByText("Application sent")).toBeInTheDocument();
    expect(screen.getByText(/A Trucker HQ recruiter will call you/)).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/apply");
    expect(JSON.parse(init.body as string)).toEqual({
      jobSlug: "acme-otr",
      fullName: "Ann Driver",
      phone: "5551234567",
      cdlClass: "A",
      experience: "5+ yrs",
      language: "EN",
      website: "",
    });
  });

  it("shows the server validation message in the alert", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ error: "Enter a valid US phone number" }, { status: 400 })),
    );
    render(<ApplyForm jobSlug="acme-otr" />);
    await fillAndSubmit();
    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a valid US phone number");
  });
});
