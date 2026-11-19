import { expect, test } from "@playwright/test";

test("slash key opens search dialog and focuses the search input", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("/");
  const dialog = page.getByRole("dialog", { name: "Search articles" });
  await expect(dialog).toBeVisible();

  const input = page.getByPlaceholder("Search articles, topics, tags…");
  await expect(input).toBeFocused();
});

test("search finds nothing for a nonsense query", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("/");
  await page.getByPlaceholder("Search articles, topics, tags…").fill("zzzznomatchzzzz");
  await expect(page.getByText(/No articles match/)).toBeVisible();
});
