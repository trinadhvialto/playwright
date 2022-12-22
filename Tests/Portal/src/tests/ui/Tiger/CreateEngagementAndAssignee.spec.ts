import { test, expect, Page } from '@playwright/test';
import { TigerHomePage } from '../../../pages/tigerPage/tigerHomePage';
import { PwcLoginPage } from '../../../pages/pwcLoginPage';
import { CreateNewEngagmentPage } from '../../../pages/tigerPage/createNewEngagmentPage';

let page: Page;
let pwcLoginPage : PwcLoginPage;
let tigerHomePage : TigerHomePage;
let createNewEngagmentPage : CreateNewEngagmentPage;
let noOfTimesLaunched = 0;

test.describe("Create a new engagement and add a new assignee to the same", function () {
    test.describe.configure({ mode: 'serial' });
    test.beforeAll(async ({browser}) => {
        if (!page && !noOfTimesLaunched) {
            page = await browser.newPage();
            pwcLoginPage = new PwcLoginPage(page);
            tigerHomePage = new TigerHomePage(page);
            createNewEngagmentPage = new CreateNewEngagmentPage(page);
            await tigerHomePage.navigateToTigerHomePage();
        }
    })

    test("Navigate to Tiger Login Page and verify expected elements are displayed",async () => {
        await test.step("Login to PWC", async () => {
            expect.soft(await pwcLoginPage.isLoginPresent()).toBe(true);
            await pwcLoginPage.loginToPWCwithValidCredentials();
            await tigerHomePage.acceptAllCookies();
        })

        await test.step("Navigate to create new engagement page",async () => {
            await tigerHomePage.navigateToCreateNewEngagementPage();
            await createNewEngagmentPage.clickDismissButton();
            expect.soft(await createNewEngagmentPage.isCreateNewEngagmentPageOpen()).toBe(true);
            await createNewEngagmentPage.createNewEngagement();
        })
    })
});