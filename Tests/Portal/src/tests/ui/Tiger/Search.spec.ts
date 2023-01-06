import {  test, expect, Page } from '@playwright/test';
import { TigerHomePage } from '../../../pages/tigerpages/tigerHomePage';
import { LoginPage } from '../../../pages/tigerpages/loginPage';
import { TigerAssigneePage } from '../../../pages/tigerpages/assigneePage';

let loginpage: any;
let homePage: any;
let page: Page;
let assigneePage: any;
let noOfTimesLaunched = 0;

test.describe("Login to Tiger and search data", function() {
test.describe.configure({});
    test.beforeAll(async function ({ browser }) {
        if (!page && !noOfTimesLaunched) {
            page = await browser.newPage();       
            loginpage = new LoginPage(page);
            homePage = new TigerHomePage(page);
            assigneePage = new TigerAssigneePage(page);
            //homePage.waitTime=200000;
            loginpage.navigateToUrl();
            noOfTimesLaunched = noOfTimesLaunched + 1;
        }
    });

    test("Login into Tiger application", async () => {
        //test.slow();
        await loginpage.logintoTigerApplication();
        expect(await homePage.waitForTigerPage()).toBe(true);
    });

    test("Search record", async () => {
        await homePage.isSearchBoxPresent();
        await homePage.selectSearchType("Assignee");
        await homePage.enterSearchText("Anupama");
        await homePage.selectDataRow("576567");
        await homePage.clickAcceptAllCookies();
        //await page.locator('#pendo-button-ace439d6').click();
        expect(await assigneePage.isAssigneeIdPresent()).toContainText("Anupama");



    
});

})