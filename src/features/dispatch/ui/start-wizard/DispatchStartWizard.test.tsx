// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SMS_CONSENT_VERSION } from "@/shared/config/sms-consent";
import { DispatchStartWizard } from "./DispatchStartWizard";

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  fetchMock.mockReset();
  vi.unstubAllGlobals();
});

const next = () => userEvent.click(screen.getByRole("button", { name: "Next" }));

async function reachCallStep() {
  await next();
  await next();
  await next();
}

describe("DispatchStartWizard", () => {
  it("walks all steps, posts the payload and focuses the success heading", async () => {
    render(<DispatchStartWizard />);
    expect(screen.getByRole("heading", { name: "Your truck" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("radio", { name: "Reefer" }));
    await userEvent.click(screen.getByRole("button", { name: "More trucks" }));
    await next();

    const lanesHeading = screen.getByRole("heading", { name: "Lanes and home time" });
    expect(lanesHeading).toHaveFocus();
    expect(screen.getByRole("status")).toHaveTextContent("Step 2 of 4: Lanes");
    await userEvent.type(screen.getByLabelText("Home base"), "Chicago, IL");
    await userEvent.click(screen.getByRole("checkbox", { name: "Texas & South" }));
    await next();

    await userEvent.type(screen.getByLabelText("MC/DOT number"), "1182044");
    await next();

    await userEvent.type(screen.getByLabelText("Name (required)"), "Test Driver");
    await userEvent.type(screen.getByLabelText("Phone (required)"), "(555) 555-5555");
    const consent = screen.getByRole("checkbox", { name: /I agree to receive text messages/ });
    expect(consent).not.toBeChecked();
    await userEvent.click(consent);
    await userEvent.click(screen.getByRole("button", { name: "Request my call" }));

    const success = await screen.findByRole("heading", { name: "You're on the list" });
    expect(success).toHaveFocus();
    expect(screen.getByText(/A dispatcher will call \(555\) 555-5555 today, in English/)).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/dispatch-start");
    expect(JSON.parse(init.body)).toEqual({
      trailerType: "Reefer",
      trucks: 2,
      driverType: "I drive",
      homeBase: "Chicago, IL",
      lanes: ["Midwest", "Texas & South"],
      homeTime: "Every week",
      authority: "I have an MC",
      mcNumber: "1182044",
      name: "Test Driver",
      phone: "(555) 555-5555",
      bestTime: "Today",
      language: "English",
      website: "",
      smsConsent: true,
      smsConsentVersion: SMS_CONSENT_VERSION,
    });
    // The full four-step flow takes ~2s alone and can pass the 5s default under a parallel run.
  }, 15_000);

  it("moves authority selection with the arrow keys", async () => {
    render(<DispatchStartWizard />);
    await next();
    await next();
    screen.getByRole("radio", { name: "I have an MC" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "MC is pending" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "I have an MC" })).not.toBeChecked();
  });

  it("swaps the MC field for the checklist hint when there is no authority", async () => {
    render(<DispatchStartWizard />);
    await next();
    await next();
    await userEvent.click(screen.getByRole("radio", { name: "I don't have one yet" }));
    expect(screen.queryByLabelText("MC/DOT number")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "New MC Checklist" })).toBeInTheDocument();
  });

  it("goes back through the stepper and keeps entered data", async () => {
    render(<DispatchStartWizard />);
    await next();
    await next();
    await userEvent.click(screen.getByRole("button", { name: "Truck" }));
    expect(screen.getByRole("heading", { name: "Your truck" })).toHaveFocus();
    expect(screen.getAllByRole("listitem")[0]).toHaveAttribute("aria-current", "step");
  });

  it("shows the server message and stays on the call step when the request fails", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "Too many requests" }), { status: 429 }),
    );
    render(<DispatchStartWizard />);
    await reachCallStep();
    await userEvent.type(screen.getByLabelText("Name (required)"), "Test Driver");
    await userEvent.type(screen.getByLabelText("Phone (required)"), "555");
    const consent = screen.getByRole("checkbox", { name: /I agree to receive text messages/ });
    expect(consent).not.toBeChecked();
    await userEvent.click(consent);
    await userEvent.click(screen.getByRole("button", { name: "Request my call" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Too many requests");
    expect(screen.getByRole("button", { name: "Request my call" })).toBeEnabled();
  });

  it("falls back to the generic message when the network fails", async () => {
    fetchMock.mockRejectedValue(new TypeError("offline"));
    render(<DispatchStartWizard />);
    await reachCallStep();
    await userEvent.type(screen.getByLabelText("Name (required)"), "Test Driver");
    await userEvent.type(screen.getByLabelText("Phone (required)"), "555");
    const consent = screen.getByRole("checkbox", { name: /I agree to receive text messages/ });
    expect(consent).not.toBeChecked();
    await userEvent.click(consent);
    await userEvent.click(screen.getByRole("button", { name: "Request my call" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Something went wrong. Try again, or call us directly.",
    );
  });
});

describe("DispatchStartWizard in Russian", () => {
  it("shows Russian labels but posts the same English option values", async () => {
    render(<DispatchStartWizard locale="RU" />);
    expect(screen.getByRole("heading", { name: "Ваш трак" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("radio", { name: "Реф" }));
    await userEvent.click(screen.getByRole("button", { name: "Далее" }));

    expect(screen.getByRole("status")).toHaveTextContent("Шаг 2 из 4: Маршруты");
    await userEvent.type(screen.getByLabelText("Домашняя база"), "Chicago, IL");
    await userEvent.click(screen.getByRole("checkbox", { name: "Техас и юг" }));
    await userEvent.click(screen.getByRole("button", { name: "Далее" }));
    await userEvent.click(screen.getByRole("button", { name: "Далее" }));

    await userEvent.type(screen.getByLabelText("Имя (обязательно)"), "Тест");
    await userEvent.type(screen.getByLabelText("Телефон (обязательно)"), "(555) 555-5555");
    const consent = screen.getByRole("checkbox", { name: /Я согласен получать SMS/ });
    await userEvent.click(consent);
    expect(screen.getByRole("radio", { name: "Русский" })).toBeChecked();
    await userEvent.click(screen.getByRole("button", { name: "Заказать звонок" }));

    const success = await screen.findByRole("heading", { name: "Заявка принята" });
    expect(success).toHaveFocus();
    expect(screen.getByText(/Диспетчер позвонит \(555\) 555-5555 сегодня, разговор будет на русском/)).toBeInTheDocument();

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      trailerType: "Reefer",
      trucks: 1,
      driverType: "I drive",
      homeBase: "Chicago, IL",
      lanes: ["Midwest", "Texas & South"],
      homeTime: "Every week",
      authority: "I have an MC",
      mcNumber: "",
      name: "Тест",
      phone: "(555) 555-5555",
      bestTime: "Today",
      language: "Русский",
      website: "",
      smsConsent: true,
      smsConsentVersion: SMS_CONSENT_VERSION,
    });
  }, 15_000);

  it("pluralizes trucks in the price summary", async () => {
    render(<DispatchStartWizard locale="RU" />);
    expect(screen.getByText("/ неделя × 1 трак")).toBeInTheDocument();
    const more = screen.getByRole("button", { name: "Больше траков" });
    await userEvent.click(more);
    expect(screen.getByText("/ неделя × 2 трака")).toBeInTheDocument();
    for (let i = 0; i < 3; i++) await userEvent.click(more);
    expect(screen.getByText("/ неделя × 5 траков")).toBeInTheDocument();
  });
});
