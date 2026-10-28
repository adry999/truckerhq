// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/jobs",
  useSearchParams: () => new URLSearchParams("q=secret&type=OTR"),
}));
vi.mock("next/script", () => ({
  default: ({ src }: { src?: string }) => <script data-testid="remote" data-src={src} />,
}));

async function load(consent?: "granted" | "denied") {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST");
  vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "123");
  if (consent) localStorage.setItem("chq_consent", consent);
  const [{ default: Analytics }, consentStore] = await Promise.all([
    import("./Analytics"),
    import("@/shared/client/consent"),
  ]);
  return { Analytics, ...consentStore };
}

const pageViews = () =>
  (window.dataLayer ?? [])
    .map((entry) => Array.from(entry as ArrayLike<unknown>))
    .filter((args) => args[0] === "event" && args[1] === "page_view");

beforeEach(() => {
  localStorage.clear();
  window.dataLayer = undefined;
  window.gtag = undefined;
  window.fbq = undefined;
});
afterEach(() => vi.unstubAllEnvs());

describe("Analytics", () => {
  it("loads no tracker script and shows the banner before a choice", async () => {
    const { Analytics } = await load();
    const { container, getByRole } = render(<Analytics />);
    expect(container.querySelector("script")).toBeNull();
    expect(window.gtag).toBeUndefined();
    expect(window.fbq).toBeUndefined();
    expect(getByRole("region", { name: "Cookie consent" })).toBeInTheDocument();
  });

  it("loads nothing after Decline", async () => {
    const { Analytics } = await load("denied");
    const { container, queryByRole } = render(<Analytics />);
    expect(container.querySelector("script")).toBeNull();
    expect(queryByRole("region", { name: "Cookie consent" })).toBeNull();
  });

  it("sends exactly one GA pageview, with only safe query params, when consent is granted", async () => {
    const { Analytics, setConsent } = await load();
    const { container } = render(<Analytics />);
    act(() => setConsent("granted"));
    expect(container.querySelectorAll("script")).toHaveLength(2);
    expect(pageViews()).toEqual([["event", "page_view", { page_path: "/jobs?type=OTR" }]]);
  });

  it("does not repeat the pageview on re-render", async () => {
    const { Analytics } = await load("granted");
    const { rerender } = render(<Analytics />);
    rerender(<Analytics />);
    expect(pageViews()).toHaveLength(1);
  });
});
