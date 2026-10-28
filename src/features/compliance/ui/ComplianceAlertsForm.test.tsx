// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SMS_CONSENT_VERSION } from "@/shared/config/sms-consent";
import ComplianceAlertsForm from "./ComplianceAlertsForm";

afterEach(() => vi.unstubAllGlobals());

async function fillAndSubmit() {
  await userEvent.type(screen.getByLabelText(/^1\. Your DOT or MC number/), "3412897");
  await userEvent.type(screen.getByLabelText(/^Mobile number/), "5551234567");
  await userEvent.click(screen.getByLabelText(/I agree to receive text messages from Trucker HQ/));
  await userEvent.click(screen.getByRole("button", { name: "Turn on alerts" }));
}

describe("ComplianceAlertsForm", () => {
  it("keeps submit disabled until consent is given", async () => {
    render(<ComplianceAlertsForm />);
    const submit = screen.getByRole("button", { name: "Turn on alerts" });
    expect(submit).toBeDisabled();
    await userEvent.click(screen.getByLabelText(/I agree to receive text messages from Trucker HQ/));
    expect(submit).toBeEnabled();
  });

  it("posts the watch list and shows the success panel", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ComplianceAlertsForm />);
    await userEvent.click(screen.getByLabelText(/New inspections and crashes/));
    await userEvent.click(screen.getByLabelText(/UCR registration/));
    await userEvent.click(screen.getByRole("radio", { name: "Русский" }));
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
      smsConsentVersion: SMS_CONSENT_VERSION,
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

  it("shows Russian labels and consent and defaults the text language to Russian on the RU page", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ComplianceAlertsForm lang="RU" />);
    expect(screen.getByLabelText(/^1\. Ваш номер DOT или MC/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Мобильный номер/)).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Русский" })).toBeChecked();
    expect(screen.getByLabelText(/Я согласен получать SMS от Trucker HQ/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/I agree to receive text messages/)).not.toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/^1\. Ваш номер DOT или MC/), "3412897");
    await userEvent.type(screen.getByLabelText(/^Мобильный номер/), "5551234567");
    await userEvent.click(screen.getByLabelText(/Я согласен получать SMS от Trucker HQ/));
    await userEvent.click(screen.getByRole("button", { name: "Включить уведомления" }));
    expect(await screen.findByText("Уведомления включены")).toBeInTheDocument();
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(init.body as string)).toMatchObject({ language: "RU", smsConsent: true });
    expect(screen.getByRole("link", { name: "New MC Checklist" })).toHaveAttribute(
      "href",
      "/ru/tools/new-mc-checklist",
    );
  }, 15000);

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
