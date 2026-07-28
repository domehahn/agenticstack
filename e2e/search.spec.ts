import { expect, test } from "@playwright/test";

test("slash key opens search and navigates to a result", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("/");
  const dialog = page.getByRole("dialog", { name: "Search articles" });
  await expect(dialog).toBeVisible();

  const input = page.getByPlaceholder("Search articles, topics, tags…");
  await expect(input).toBeFocused();
  await input.fill("agentic engineering");

  const result = page
    .getByRole("listbox", { name: "Suggestions" })
    .getByText("What Is Agentic Engineering?");
  await expect(result).toBeVisible();
  await result.click();

  await expect(page).toHaveURL("/blog/what-is-agentic-engineering");
  await expect(dialog).toBeHidden();
});

test("search finds nothing for a nonsense query", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("/");
  await page.getByPlaceholder("Search articles, topics, tags…").fill("zzzznomatchzzzz");
  await expect(page.getByText(/No articles match/)).toBeVisible();
});
