// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SMS_CONSENT_VERSION } from "@/shared/config/sms-consent";
import ApplyForm from "./ApplyForm";

const siteKey = vi.hoisted(() => ({ value: "" }));
vi.mock("@/shared/config/turnstile", () => ({
  get TURNSTILE_SITE_KEY() {
    return siteKey.value;
  },
}));
vi.mock("next/script", () => ({ default: () => null }));

afterEach(() => {
  siteKey.value = "";
  vi.unstubAllGlobals();
});

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
      smsConsent: false,
      smsConsentVersion: SMS_CONSENT_VERSION,
      website: "",
    });
  });

  it("offers an unchecked, optional SMS consent and sends it when ticked", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ApplyForm jobSlug="acme-otr" />);
    const consent = screen.getByRole("checkbox", { name: /I agree to receive text messages from Trucker HQ/ });
    expect(consent).not.toBeChecked();
    expect(consent).not.toBeRequired();
    await userEvent.click(consent);
    await fillAndSubmit();
    await screen.findByText("Application sent");
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(init.body as string)).toMatchObject({
      smsConsent: true,
      smsConsentVersion: SMS_CONSENT_VERSION,
    });
  });

  it("holds submit until the spam check yields a token, then sends it", async () => {
    siteKey.value = "site-key";
    const widget = { render: vi.fn(() => "w1"), reset: vi.fn(), remove: vi.fn() };
    vi.stubGlobal("turnstile", widget);
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ApplyForm jobSlug="acme-otr" />);
    const submit = screen.getByRole("button", { name: "Send application" });
    expect(submit).toBeDisabled();
    const options = (widget.render.mock.calls[0] as unknown as [HTMLElement, Record<string, (t?: string) => void>])[1];
    act(() => options.callback("tok-9"));
    expect(submit).toBeEnabled();
    await fillAndSubmit();
    await screen.findByText("Application sent");
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(init.body as string)).toMatchObject({ turnstileToken: "tok-9" });
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
