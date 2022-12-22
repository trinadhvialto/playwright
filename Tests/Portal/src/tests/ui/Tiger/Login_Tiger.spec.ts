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

    test("Create a new work record", async () => {
        test.slow();
        await homePage.isMenuPresent()
        await homePage.clickOnMenu();
        await homePage.clickAcceptAllCookies();
        await homePage.isCreateNewOptionPresent() 
        await homePage.clickOnCreateNewOption();
        await homePage.clickOnWorkRecordOption();
        await homePage.selectAssignee("Anupama", 1);
        await homePage.selectEngagement("Hastings - IHC - IHC New Engagement for Tax1");
        await homePage.selectWorkRecordType("Tax Return");
        await homePage.selectCountry("Jordan");
        await homePage.selectPrimaryService("Annual Tax Return");
        await homePage.selectYear("2022");
        await homePage.selectQuestionnaire("2022 Jordan");
        await homePage.selectDueDate("01/01/2023");
        await homePage.selectQuestionnaireConatct("Anupama");
        await homePage.clickOnCreateButton();

    });

    test("Send Questionnaire", async () => {
            //test.slow();
            expect(await wrPage.waitForWorkRecordPage()).toBe(true);
            await wrPage.clickOnSendQuestionnaire();;
        
        });
        

})


