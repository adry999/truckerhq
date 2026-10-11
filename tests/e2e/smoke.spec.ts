import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  await context.route(/googletagmanager\.com|facebook\.net/, (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" }),
  );
});

test("home page loads with an h1 and no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test("jobs filter chip updates the URL query", async ({ page }) => {
  await page.goto("/jobs");
  await page.getByRole("link", { name: "Reefer", exact: true }).click();
  await expect(page).toHaveURL(/equip=Reefer/);
});

test("dispatch start wizard submits and shows success", async ({ page }) => {
  await page.route("**/api/dispatch-start", (route) =>
    route.fulfill({ json: { ok: true } }),
  );
  await page.goto("/dispatch/start");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Home base").fill("Chicago, IL");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("MC/DOT number").fill("MC 1182044");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Name (required)").fill("Test Driver");
  await page.getByLabel("Phone (required)").fill("(555) 555-5555");
  await page.getByRole("button", { name: "Request my call" }).click();
  await expect(page.getByRole("heading", { name: "You're on the list" })).toBeVisible();
});

test("consent banner hides after accept and stays hidden on reload", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByRole("dialog", { name: "Cookie consent" });
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: "Accept" }).click();
  await expect(banner).toBeHidden();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(banner).toBeHidden();
});

test("unknown route returns 404", async ({ page }) => {
  const res = await page.goto("/ru/no-such-page");
  expect(res?.status()).toBe(404);
});

test("unmatched /ru URL returns 404 with the Russian page, other URLs keep the English one", async ({ page }) => {
  const ru = await page.goto("/ru/no-such-page");
  expect(ru?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Дорога закрыта" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");

  const en = await page.goto("/no-such-page");
  expect(en?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Road closed" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
