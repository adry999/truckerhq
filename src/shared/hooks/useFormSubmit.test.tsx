// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFormSubmit } from "./useFormSubmit";

function TestForm({
  onSuccess,
  turnstile,
}: {
  onSuccess?: () => void;
  turnstile?: { token: string | null; reset: () => void };
}) {
  const { status, error, onSubmit } = useFormSubmit({
    endpoint: "/api/test",
    buildBody: (form) => ({ name: new FormData(form).get("name") }),
    onSuccess,
    turnstile,
  });
  return (
    <form onSubmit={onSubmit}>
      <input name="name" defaultValue="Ann" />
      <input name="website" defaultValue="" />
      <button type="submit">Go</button>
      <p data-testid="status">{status}</p>
      <p role="alert">{error}</p>
    </form>
  );
}

function stubFetch(impl: () => Promise<Response>) {
  const fn = vi.fn(impl);
  vi.stubGlobal("fetch", fn);
  return fn;
}

afterEach(() => vi.unstubAllGlobals());

describe("useFormSubmit", () => {
  it("adds the turnstile token to the body and leaves the widget alone on success", async () => {
    const fetchMock = stubFetch(async () => new Response("{}", { status: 200 }));
    const reset = vi.fn();
    render(<TestForm turnstile={{ token: "tok-1", reset }} />);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    await screen.findByText("sent");
    const call = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(call[1].body as string)).toEqual({ name: "Ann", website: "", turnstileToken: "tok-1" });
    expect(reset).not.toHaveBeenCalled();
  });

  it("omits turnstileToken when there is no token", async () => {
    const fetchMock = stubFetch(async () => new Response("{}", { status: 200 }));
    render(<TestForm turnstile={{ token: null, reset: vi.fn() }} />);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    await screen.findByText("sent");
    const call = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(call[1].body as string)).not.toHaveProperty("turnstileToken");
  });

  it("resets the widget after a failed submit", async () => {
    stubFetch(async () => Response.json({ error: "Nope" }, { status: 400 }));
    const reset = vi.fn();
    render(<TestForm turnstile={{ token: "tok-1", reset }} />);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    await screen.findByRole("alert");
    expect(reset).toHaveBeenCalledOnce();
  });

  it("marks the form sent, calls onSuccess and posts the body with the honeypot", async () => {
    const fetchMock = stubFetch(async () => new Response("{}", { status: 200 }));
    const onSuccess = vi.fn();
    render(<TestForm onSuccess={onSuccess} />);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(await screen.findByText("sent")).toBeInTheDocument();
    expect(onSuccess).toHaveBeenCalledOnce();
    const call = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(call[1].body as string)).toEqual({ name: "Ann", website: "" });
  });

  it("shows the server message for a 400", async () => {
    stubFetch(async () => Response.json({ error: "Enter a valid US phone number" }, { status: 400 }));
    render(<TestForm />);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a valid US phone number");
    expect(screen.getByTestId("status")).toHaveTextContent("error");
  });

  it("falls back to generic copy on a network failure", async () => {
    stubFetch(async () => {
      throw new TypeError("Failed to fetch");
    });
    render(<TestForm />);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Something went wrong. Try again in a moment.",
    );
  });
});

function FocusForm() {
  const { status, onSubmit, successRef } = useFormSubmit({ endpoint: "/api/test", buildBody: () => ({}) });
  if (status === "sent") {
    return (
      <h2 ref={successRef} tabIndex={-1}>
        Thanks
      </h2>
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Go</button>
    </form>
  );
}

describe("useFormSubmit success focus", () => {
  it("moves focus to the success heading once sent", async () => {
    stubFetch(async () => new Response("{}", { status: 200 }));
    render(<FocusForm />);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(await screen.findByRole("heading", { name: "Thanks" })).toHaveFocus();
  });
});

function FieldForm({ knownFields }: { knownFields?: readonly string[] }) {
  const { error, fieldErrors, clearFieldError, onSubmit } = useFormSubmit({
    endpoint: "/api/test",
    buildBody: () => ({ phone: "1" }),
    knownFields,
  });
  return (
    <form onSubmit={onSubmit}>
      <input
        aria-label="phone"
        aria-invalid={fieldErrors.phone ? true : undefined}
        onChange={() => clearFieldError("phone")}
      />
      <p data-testid="field">{fieldErrors.phone}</p>
      <p data-testid="global">{error}</p>
      <button type="submit">Go</button>
    </form>
  );
}

describe("useFormSubmit field errors", () => {
  it("exposes field messages, drops the global one, focuses the field and clears on edit", async () => {
    stubFetch(async () => Response.json({ error: "Check the form", fields: { phone: "Bad phone" } }, { status: 400 }));
    render(<FieldForm />);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(await screen.findByText("Bad phone")).toBeInTheDocument();
    expect(screen.getByTestId("global")).toBeEmptyDOMElement();
    expect(screen.getByLabelText("phone")).toHaveFocus();
    await userEvent.type(screen.getByLabelText("phone"), "x");
    expect(screen.getByTestId("field")).toBeEmptyDOMElement();
  });

  it("keeps the global message when the failing field is not rendered", async () => {
    stubFetch(async () => Response.json({ error: "Check the form", fields: { phone: "Bad phone" } }, { status: 400 }));
    render(<FieldForm knownFields={["name"]} />);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(await screen.findByText("Check the form")).toBeInTheDocument();
    expect(screen.getByTestId("field")).toBeEmptyDOMElement();
  });
});
