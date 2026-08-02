import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
});

test("article renders content, code copy, and links to its tag page", async ({ page }) => {
  await page.goto("/blog/01-instruction-override");

  await expect(
    page.getByRole("heading", { level: 1, name: /Instruction Override/ }),
  ).toBeVisible();

  const copyButton = page.getByRole("button", { name: "Copy code to clipboard" });
  await expect(copyButton.first()).toBeVisible();
  await copyButton.first().click();
  await expect(page.getByRole("button", { name: "Copied" }).first()).toBeVisible();

  // Click on the first tag link
  const tagLink = page.getByRole("link").filter({ hasText: /^[A-Z]/ }).first();
  await tagLink.click();
  // Verify we're on a tag page
  await expect(page).toHaveURL(/\/tags\//);
});

test("topic badge on the article navigates to the topic page", async ({ page }) => {
  await page.goto("/blog/01-instruction-override");
  // Find any topic link (topics are shown as badges on articles)
  const topicLink = page.locator('a[href^="/topics/"]').first();
  await topicLink.click();
  await expect(page).toHaveURL(/\/topics\//);
});
