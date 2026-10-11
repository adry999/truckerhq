// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFormSubmit } from "./useFormSubmit";

function TestForm({ onSuccess }: { onSuccess?: () => void }) {
  const { status, error, onSubmit } = useFormSubmit({
    endpoint: "/api/test",
    buildBody: (form) => ({ name: new FormData(form).get("name") }),
    onSuccess,
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
