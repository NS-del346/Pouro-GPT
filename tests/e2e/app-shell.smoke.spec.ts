import { expect, test } from "@playwright/test";

test("current app shell renders at the GitHub Pages base path without overflow", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("./", { waitUntil: "domcontentloaded" });

  await expect(page).toHaveTitle("Pourō");
  await expect(page.locator("#root")).not.toBeEmpty();
  await expect(page.getByText("Pour slowly. Brew deeply.")).toBeVisible();

  const geometry = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));

  expect(geometry.innerWidth).toBe(375);
  expect(geometry.documentScrollWidth).toBeLessThanOrEqual(geometry.innerWidth);
  expect(geometry.bodyScrollWidth).toBeLessThanOrEqual(geometry.innerWidth);
  expect(pageErrors).toEqual([]);
});
