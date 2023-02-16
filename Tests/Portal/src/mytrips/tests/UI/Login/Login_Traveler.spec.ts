import { test, expect, Page } from '@playwright/test';
import { TestData } from '../../../../utils/test_data';
import { TravelHomePage } from '../../../pages/travelerPage/travelerMainPage';
import { LoginPage } from './../../../pages/loginPage';
const sql = require('mssql');

let page: Page;
let noOfTimesLaunched = 0;

test.describe("Login to Traveler and book a trip", function () {
    test.describe.configure({ mode: 'serial' });
    // test.beforeAll(async function ({ browser }) {
    //     if (!page && !noOfTimesLaunched) {
    //         page = await browser.newPage();
    //         page['loginActions'] = new LoginPage(page);
    //         page['homePage'] = new TravelHomePage(page);
    //         await page['loginActions'].openMyTripApplication();
    //         noOfTimesLaunched = noOfTimesLaunched + 1;
    //     }
    // });

    // test.afterAll(async function () {
    //     await page.close();
    // });

    test('Login to Mytrips application', async ({ page }) => {

        await test.step('Verify expected elements are displayed in login page', async () => {
        // await page['loginActions'].validateLandingPageBasicElements();
            var connection = await TestData.sqlDBConnection();
            let data = await TestData.executeSqlQuery(connection, "select top 5 * from lion.emailmessages order by id desc");
            console.log(data);

            // try {
            //     // make sure that any items are correctly URL encoded in the connection string
            //     await sql.connect('Server=NEZXPHGPWDWV002.pwcglb.com,1433;Database=myTripsCore_QA;User Id=mtqaappuser_2;Password=B$6UMDhES!wKcYX88U#R;Encrypt=true')
            //     const result = await sql.query`select top 5 * from lion.emailmessages order by id desc`
            //     console.dir(result)
            // } catch (err) {
            //     console.dir('errpr')
            //     console.dir(err)
            //     // ... error checks
            // }
        });

        // await test.step('verifying invalid login attempts', async () => {
        //     await page['loginActions'].invalidLoginAttempts();
        // });

        // await test.step('Verify Trouble login in? functionality', async () => {
        //     await page['loginActions'].verifyLoginHelpText();
        // });

        // await test.step('Verify Traveler able login into mytrips without an issue', async () => {
        //     await page['loginActions'].loginIntoMyTripApplication();
        //     expect(await page['homePage'].waitForTravelerPage()).toBe(true);
        // });
    });

    // test("Login into MyTrips application with Traveler account", async () => {

    // });

});