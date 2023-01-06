import { chromium, test, expect, Page } from '@playwright/test';
import { TigerHomePage } from '../../../pages/tigerpages/tigerHomePage';
import { LoginPage } from '../../../pages/tigerpages/loginPage';
import {WorkRecordPage} from '../../../pages/tigerpages/workRecordPage';


let loginpage: any;
let homePage: any;
let page: Page;
let wrPage: any;
let noOfTimesLaunched = 0;


test.describe("Login to Tiger and create Work Record", function() {
    // test.describe.configure({ mode: 'serial' });
    test.beforeAll(async function ({ browser }) {
        if (!page && !noOfTimesLaunched) {
            page = await browser.newPage();
            
        //     await page.goto("https://tiger-stage.vialto.com/#/search-home");
            loginpage = new LoginPage(page);
            homePage = new TigerHomePage(page);
            wrPage = new WorkRecordPage(page);
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

   

})


