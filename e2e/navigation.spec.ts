import { expect, test } from "@playwright/test";

test("primary navigation moves between top-level sections", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "primary nav is hidden on mobile; see mobile-nav.spec.ts");

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Engineering the agentic era." })).toBeVisible();

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL("/blog");
  await expect(page.getByRole("heading", { name: "Blog", exact: true })).toBeVisible();

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Topics" }).click();
  await expect(page).toHaveURL("/topics");
  await expect(page.getByRole("heading", { name: "Topics", exact: true })).toBeVisible();

  await page.getByRole("link", { name: "AgenticStack home" }).click();
  await expect(page).toHaveURL("/");
});

test("visiting an unknown route shows the branded 404", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "This route doesn't exist." })).toBeVisible();
  await page.getByRole("link", { name: /Back to the publication/ }).click();
  await expect(page).toHaveURL("/");
});
