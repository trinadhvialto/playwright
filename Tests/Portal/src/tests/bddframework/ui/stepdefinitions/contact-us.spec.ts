import { test, expect, Page, chromium } from "@playwright/test";
import { Given, Then } from '@cucumber/cucumber';
import { OurWorld } from "../../../../../type";

let page : any;


Given('User visits {string}', async function (this: OurWorld, url: string) {
    // async () => {
    //     const browser = await chromium.launch({
    //         headless: false
    //     });
        // const context = await browser.newContext()
        // page = await context.newPage();
        await this.page.goto('https://${url}');
    // }
});

Then('User navigates to {string}', async (solutionsurl : string) => {
    async () => {
        await page.locator('span:has-text("Solutions")').click();
        await expect(page).toHaveURL('https://${url}');
    }
});

Then(/^User submits '([^']*)'$/, async (text : string) => {
   async () => {
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