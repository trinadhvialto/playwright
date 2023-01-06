import { chromium, test, expect, Page } from '@playwright/test';
import { TigerHomePage } from '../../../pages/tigerpages/tigerHomePage';
import { LoginPage } from '../../../pages/tigerpages/loginPage';
import { TigerAssigneePage } from '../../../pages/tigerpages/assigneePage';
import { Context } from 'vm';


let loginpage: any;
let homePage: any;
let page: Page;
let newPage: Page;
let assigneePage: any;
let noOfTimesLaunched = 0;

test.describe("Login to Tiger and impersonate assignee", function() {
    // test.describe.configure({ mode: 'serial' });
    test.beforeAll(async function ({ browser }) {
        if (!page && !noOfTimesLaunched) {
            //context = await browser.newContext();
            //page = await context.newPage();
            page = await browser.newPage();
            
            
        //     await page.goto("https://tiger-stage.vialto.com/#/search-home");
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

    test("Search assignee and impersonate", async () => {
        test.slow();
        await homePage.isSearchBoxPresent();
        await homePage.selectSearchType("Assignee");
        await homePage.enterSearchText("Anupama");
        await homePage.selectDataRow("576567");
        //expect(await assigneePage.isAssigneeIdPresent()).toContainText("Anupama");
        console.log(page.url());
        
    });

})