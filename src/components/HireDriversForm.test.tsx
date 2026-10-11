// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HireDriversForm from "./HireDriversForm";

afterEach(() => vi.unstubAllGlobals());

async function fillAndSubmit() {
  await userEvent.type(screen.getByLabelText(/^Company name/), "Acme Freight");
  await userEvent.type(screen.getByLabelText(/^DOT number/), "1234567");
  await userEvent.type(screen.getByLabelText(/^Your name/), "Ann");
  await userEvent.type(screen.getByLabelText(/^Phone/), "5551234567");
  await userEvent.type(screen.getByLabelText(/^Pay/), "$0.70/mi");
  await userEvent.type(screen.getByLabelText(/^Home base/), "Dallas, TX");
  await userEvent.click(screen.getByRole("button", { name: "REEFER" }));
  await userEvent.click(screen.getByRole("button", { name: "Send job" }));
}

describe("HireDriversForm", () => {
  it("posts the job and shows the success panel", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<HireDriversForm />);
    await fillAndSubmit();
    expect(await screen.findByText("Job received")).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/hire-drivers");
    expect(JSON.parse(init.body as string)).toEqual({
      companyName: "Acme Freight",
      dotNumber: "1234567",
      contactName: "Ann",
      phone: "5551234567",
      pay: "$0.70/mi",
      homeBase: "Dallas, TX",
      position: "OTR",
      equipment: "Reefer",
      driverLanguage: "Any",
      website: "",
    });
  });

  it("shows the server error message in the alert", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ error: "Enter a valid DOT number" }, { status: 400 })),
    );
    render(<HireDriversForm />);
    await fillAndSubmit();
    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a valid DOT number");
  });
});
