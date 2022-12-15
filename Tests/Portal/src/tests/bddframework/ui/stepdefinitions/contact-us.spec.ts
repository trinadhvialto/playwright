import { test, expect, Page } from "@playwright/test";
import { Given, Then } from '@cucumber/cucumber';

Given('User visits {string}', async function (url: string) {
    async (page:Page) => {
        await page.goto('https://${url}');
    }
});

Then('User navigates to {string}', async function (solutionsurl : string) {
    async (page:Page) => {
        await page.locator('span:has-text("Solutions")').click();
        await expect(page).toHaveURL('https://${url}');
    }
});

Then(/^User submits '([^']*)'$/, async function (text : string) {
   async (page:Page) => {
    await page.getByRole("link", { name: "Contact Us" }).click();
    await page.getByPlaceholder("First Name").click();
    await page.getByPlaceholder("First Name").press("CapsLock");
    await page.getByPlaceholder("First Name").fill("D");
    await page.getByPlaceholder("First Name").press("CapsLock");
    await page.getByPlaceholder("First Name").fill("Demo1");
    await page.getByPlaceholder("First Name").press("Tab");
    await page.getByPlaceholder("Last Name").fill("demo2");
    await page.getByPlaceholder("Last Name").press("Tab");
    await page.getByPlaceholder("email@email.com").fill("email@gmail.com");
    await page.getByPlaceholder("email@email.com").press("Tab");
    await page.getByPlaceholder("Company").fill("vialtotest");
    await page.getByPlaceholder("Company").press("Tab");
    await page
        .getByRole("combobox", { name: "Location" })
        .selectOption("India");
   }
})