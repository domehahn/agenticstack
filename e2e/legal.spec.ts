import { expect, test } from "@playwright/test";

test("Impressum is reachable and shows required provider details", async ({
  page,
}) => {
  await page.goto("/impressum");
  await expect(
    page.getByRole("heading", { name: "Impressum", level: 1 }),
  ).toBeVisible();
  await expect(page.getByText("Dominik Hahn").first()).toBeVisible();
  await expect(page.getByText("Raiffeisenstraße 4B").first()).toBeVisible();
  await expect(page.getByText("55491 Büchenbeuren").first()).toBeVisible();

  const emailLink = page.getByRole("link", { name: "aboutdevops@gmail.com" });
  await expect(emailLink).toBeVisible();
  await expect(emailLink).toHaveAttribute(
    "href",
    "mailto:aboutdevops@gmail.com",
  );
});

test("Datenschutz is reachable and covers the responsible party and Cloudflare", async ({
  page,
}) => {
  await page.goto("/datenschutz");
  await expect(
    page.getByRole("heading", { name: "Datenschutzerklärung", level: 1 }),
  ).toBeVisible();
  await expect(page.getByText("Dominik Hahn").first()).toBeVisible();
  await expect(page.getByText("Cloudflare").first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Lokale Speicherung der Darstellungseinstellung/ }),
  ).toBeVisible();
});

test("footer links to Impressum and Datenschutz", async ({ page }) => {
  await page.goto("/");
  const impressumLink = page.getByRole("link", { name: "Impressum" });
  const datenschutzLink = page.getByRole("link", { name: "Datenschutz" });

  await expect(impressumLink).toBeVisible();
  await expect(datenschutzLink).toBeVisible();

  await impressumLink.click();
  await expect(page).toHaveURL("/impressum");

  await page.goto("/");
  await datenschutzLink.click();
  await expect(page).toHaveURL("/datenschutz");
});
