import { expect, test } from "@playwright/test";

test("topic index links to a working topic detail page", async ({ page }) => {
  await page.goto("/topics");
  await expect(page.getByRole("heading", { name: "Topics", exact: true })).toBeVisible();

  await page.getByRole("link", { name: /DevSecOps/ }).click();
  await expect(page).toHaveURL("/topics/devsecops");
  await expect(page.getByText("Topic", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "DevSecOps", exact: true })).toBeVisible();
});

test("a topic with no articles yet shows an intentional empty state", async ({ page }) => {
  await page.goto("/topics/security");
  await expect(page.getByText(/No articles published under Security yet\./)).toBeVisible();
});
