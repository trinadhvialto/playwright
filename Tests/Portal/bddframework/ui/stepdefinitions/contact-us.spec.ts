// import { test, expect } from "@playwright/test";
// import { Given, Then } from '@cucumber/cucumber';

// test.describe("BDD Framework", function () {
//     test.beforeAll(async function () {
   
//     });

//     test("sample UI test", async function ({ page }) {
//         Given('User visits Vialto Page', async function () {
//             await page.goto("https://vialtopartners.com");
//         })
    
//         Then('User navigates to contact us page', async function () {
//             await page.locator('span:has-text("Solutions")').click();
//             await expect(page).toHaveURL("https://vialtopartners.com/solutions");
//         })
        
//         Then('User submits contact details', async function () {
//             await page.getByRole("link", { name: "Contact Us" }).click();
//             await page.getByPlaceholder("First Name").click();
//             await page.getByPlaceholder("First Name").press("CapsLock");
//             await page.getByPlaceholder("First Name").fill("D");
//             await page.getByPlaceholder("First Name").press("CapsLock");
//             await page.getByPlaceholder("First Name").fill("Demo1");
//             await page.getByPlaceholder("First Name").press("Tab");
//             await page.getByPlaceholder("Last Name").fill("demo2");
//             await page.getByPlaceholder("Last Name").press("Tab");
//             await page.getByPlaceholder("email@email.com").fill("email@gmail.com");
//             await page.getByPlaceholder("email@email.com").press("Tab");
//             await page.getByPlaceholder("Company").fill("vialtotest");
//             await page.getByPlaceholder("Company").press("Tab");
//             await page
//                 .getByRole("combobox", { name: "Location" })
//                 .selectOption("India");
//         })
//     })
// });