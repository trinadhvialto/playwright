import { test, Page } from '@playwright/test';
import { credentialsJson, LoginPage } from '../../../index';

/*let page: Page;
let noOfTimesLaunched = 0;
let loginActions;*/

test.describe("Login to Traveler and book a trip", function () {
/*    test.describe.configure({ mode: 'serial' });
    test.beforeAll(async function ({ browser }) {
        if (!page && !noOfTimesLaunched) {
            page = await browser.newPage();
           
            noOfTimesLaunched = noOfTimesLaunched + 1;
        }
    });

    test.afterAll(async function () {
        await page.close();
    });*/

    test('Login to Mytrips application', async ({page}) => {
        const loginActions = new LoginPage(page);
        await loginActions.openMyTripApplication();
        await test.step('Verify expected elements are displayed in login page', async () => {
         await loginActions.validateLandingPageBasicElements();
        });

        await test.step('verifying invalid login attempts', async () => {
            await loginActions.invalidLoginAttempts();
        });

        await test.step('Verify Trouble login in? functionality', async () => {
            await loginActions.verifyLoginHelpText();
        });

        await test.step('Verify Traveler able login into mytrips without an issue', async () => {
            await loginActions.loginIntoMyTripApplication(credentialsJson.traveler.qaprasad.travaler1Username, credentialsJson.traveler.qaprasad.password);
            //expect(await page['homePage'].waitForTravelerPage()).toBe(true);
        });
    });
});