import { expect, test } from "@playwright/test";

test("mobile menu opens, lists primary nav, and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile nav only renders on small viewports");

  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const menu = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(menu).toBeVisible();

  await menu.getByRole("link", { name: "Series" }).click();
  await expect(page).toHaveURL("/series");
  await expect(menu).toBeHidden();
});
