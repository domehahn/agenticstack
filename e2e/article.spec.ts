import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
});

test("blog index renders and, when articles exist, navigates to an article detail page", async ({
  page,
}) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();

  const firstArticleLink = page.locator('a[href^="/blog/"]').first();
  if ((await firstArticleLink.count()) === 0) {
    await expect(page.getByText("No articles here yet.")).toBeVisible();
    return;
  }

  await firstArticleLink.click();
  await expect(page).toHaveURL(/\/blog\/.+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
