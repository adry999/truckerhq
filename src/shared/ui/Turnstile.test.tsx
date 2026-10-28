// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { useTurnstile } from "@/shared/hooks/useTurnstile";
import { Turnstile } from "./Turnstile";

vi.mock("next/script", () => ({ default: () => null }));

const siteKey = vi.hoisted(() => ({ value: "" }));
vi.mock("@/shared/config/turnstile", () => ({
  get TURNSTILE_SITE_KEY() {
    return siteKey.value;
  },
}));

function Harness({ locale }: { locale?: "EN" | "RU" }) {
  const controller = useTurnstile();
  return (
    <>
      <Turnstile controller={controller} locale={locale} />
      <p data-testid="state">{controller.ready ? "ready" : "blocked"}:{controller.token ?? "none"}</p>
      <button type="button" onClick={controller.reset}>
        reset
      </button>
    </>
  );
}

const render_ = vi.fn();
const reset_ = vi.fn();
const remove_ = vi.fn();

beforeEach(() => {
  render_.mockReturnValue("w1");
  vi.stubGlobal("turnstile", { render: render_, reset: reset_, remove: remove_ });
});

afterEach(() => {
  siteKey.value = "";
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("Turnstile", () => {
  it("renders nothing and never blocks submit without a site key", () => {
    render(<Harness />);
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
    expect(render_).not.toHaveBeenCalled();
    expect(screen.getByTestId("state")).toHaveTextContent("ready:none");
  });

  it("renders the widget, exposes the token and clears it on expiry", () => {
    siteKey.value = "site-key";
    render(<Harness locale="RU" />);
    expect(screen.getByRole("group", { name: "Проверка от спама" })).toBeInTheDocument();
    expect(screen.getByTestId("state")).toHaveTextContent("blocked:none");
    const options = render_.mock.calls[0][1];
    expect(options).toMatchObject({ sitekey: "site-key", theme: "light", size: "flexible", language: "ru" });

    act(() => options.callback("tok-1"));
    expect(screen.getByTestId("state")).toHaveTextContent("ready:tok-1");
    act(() => options["expired-callback"]());
    expect(screen.getByTestId("state")).toHaveTextContent("blocked:none");
    act(() => options.callback("tok-2"));
    act(() => options["error-callback"]());
    expect(screen.getByTestId("state")).toHaveTextContent("blocked:none");
  });

  it("resets the widget when the controller resets and removes it on unmount", () => {
    siteKey.value = "site-key";
    const { unmount } = render(<Harness />);
    act(() => render_.mock.calls[0][1].callback("tok-1"));
    act(() => screen.getByRole("button", { name: "reset" }).click());
    expect(reset_).toHaveBeenCalledWith("w1");
    expect(screen.getByTestId("state")).toHaveTextContent("blocked:none");
    unmount();
    expect(remove_).toHaveBeenCalledWith("w1");
  });
});
