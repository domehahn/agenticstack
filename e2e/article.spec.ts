import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
});

test("article renders content, code copy, and links to its tag page", async ({ page }) => {
  await page.goto("/blog/what-is-agentic-engineering");

  await expect(
    page.getByRole("heading", { level: 1, name: "What Is Agentic Engineering?" }),
  ).toBeVisible();

  const copyButton = page.getByRole("button", { name: "Copy code to clipboard" });
  await expect(copyButton.first()).toBeVisible();
  await copyButton.first().click();
  await expect(page.getByRole("button", { name: "Copied" }).first()).toBeVisible();

  await page.getByRole("link", { name: "AI Agents", exact: true }).click();
  await expect(page).toHaveURL("/tags/ai-agents");
  await expect(page.getByRole("heading", { name: "#AI Agents" })).toBeVisible();
});

test("topic badge on the article navigates to the topic page", async ({ page }) => {
  await page.goto("/blog/what-is-agentic-engineering");
  await page.getByRole("link", { name: "Agentic Engineering", exact: true }).first().click();
  await expect(page).toHaveURL("/topics/agentic-engineering");
});
