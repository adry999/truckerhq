// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ComplianceAlertsForm from "./ComplianceAlertsForm";

afterEach(() => vi.unstubAllGlobals());

async function fillAndSubmit() {
  await userEvent.type(screen.getByLabelText(/^1\. Your DOT or MC number/), "3412897");
  await userEvent.type(screen.getByLabelText(/^Mobile number/), "5551234567");
  await userEvent.click(screen.getByLabelText(/I agree to receive text alerts/));
  await userEvent.click(screen.getByRole("button", { name: "Turn on alerts" }));
}

describe("ComplianceAlertsForm", () => {
  it("keeps submit disabled until consent is given", async () => {
    render(<ComplianceAlertsForm />);
    const submit = screen.getByRole("button", { name: "Turn on alerts" });
    expect(submit).toBeDisabled();
    await userEvent.click(screen.getByLabelText(/I agree to receive text alerts/));
    expect(submit).toBeEnabled();
  });

  it("posts the watch list and shows the success panel", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ComplianceAlertsForm />);
    await userEvent.click(screen.getByLabelText(/New inspections and crashes/));
    await userEvent.click(screen.getByLabelText(/UCR registration/));
    await userEvent.click(screen.getByRole("button", { name: "Русский" }));
    await fillAndSubmit();
    expect(await screen.findByText("Alerts are on")).toBeInTheDocument();
    expect(screen.getByText(/watching 5 items for 3412897/)).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/compliance-alerts");
    expect(JSON.parse(init.body as string)).toEqual({
      dot: "3412897",
      phone: "5551234567",
      language: "RU",
      watch: { auth: true, ins: true, ucr: false, boc: true, oos: true, insp: true },
      smsConsent: true,
      website: "",
    });
  });

  it("resets the form from the success panel", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
    render(<ComplianceAlertsForm />);
    await fillAndSubmit();
    await userEvent.click(await screen.findByRole("button", { name: "Watch another carrier" }));
    expect(screen.getByLabelText(/^1\. Your DOT or MC number/)).toHaveValue("");
  });

  it("shows the server error message in the alert", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ error: "Enter a valid DOT number" }, { status: 400 })),
    );
    render(<ComplianceAlertsForm />);
    await fillAndSubmit();
    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a valid DOT number");
  });
});
