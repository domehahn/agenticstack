import { expect, test } from "@playwright/test";

test("theme toggle switches and persists across reloads", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: /Switch to (dark|light) theme/ });

  const initiallyDark = (await html.getAttribute("class"))?.includes("dark") ?? false;

  await toggle.click();
  await expect(html).toHaveClass(initiallyDark ? /^((?!dark).)*$/ : /dark/);

  const afterToggleDark = (await html.getAttribute("class"))?.includes("dark") ?? false;
  expect(afterToggleDark).toBe(!initiallyDark);

  await page.reload();
  const afterReloadDark = (await html.getAttribute("class"))?.includes("dark") ?? false;
  expect(afterReloadDark).toBe(afterToggleDark);
});
