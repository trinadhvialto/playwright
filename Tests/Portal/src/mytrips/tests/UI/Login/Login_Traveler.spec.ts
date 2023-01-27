import { test, expect, Page } from '@playwright/test';
import { TravelHomePage } from '../../../pages/travelerPage/travelerMainPage';
import { Login_MyTrips_Actions } from './../../../pageActions/Login_mytrips_actions';


let loginActions: Login_MyTrips_Actions;
let homePage: any;
let page: Page;
let noOfTimesLaunched = 0;

test.describe("Login to Traveler and book a trip", function () {
    test.describe.configure({ mode: 'serial' });
    test.beforeAll(async function ({ browser }) {
        if (!page && !noOfTimesLaunched) {
            page = await browser.newPage();
            loginActions = new Login_MyTrips_Actions(page);
            homePage = new TravelHomePage(page);
            await loginActions.openMyTripApplication();
            noOfTimesLaunched = noOfTimesLaunched + 1;
        }
    });

    test('Navigate to MyTrips Travelers Page and verify expected elements are displayed', async () => {
        await loginActions.validateLandingPageBasicElements();
        await loginActions.invalidLoginAttempts();
    });

    test("Login into MyTrips application with Traveler account", async () => {
        await loginActions.verifyLoginHelpText();
        await loginActions.loginIntoMyTripApplication();
        expect(await homePage.waitForTravelerPage()).toBe(true);
    });

   /* test.skip("Verify vialto logo, mytrips logo, Travel Overview, Trip History, Account Settings, Support and Sign Out are displayed in Navpane", async () => {
        expect(await homePage.IsVialtoLogoPresent()).toBe(true);
        expect(await homePage.IsMyTripsLogoPresent()).toBe(true);
        expect(await homePage.IsTravelerViewPresent()).toBe(true);
        expect(await homePage.isTripHistoryPresent()).toBe(true);
        expect(await homePage.isAccountSettingsPresent()).toBe(true);
        expect(await homePage.isSignOutPresent()).toBe(true);
    });

    test.skip("Create a trip with Home and Destination with valid dates", async () => {
        await homePage.openFromDropdownAndSelectOptionFromDrp("India");
        await homePage.openFromDropdownAndSelectOptionToDrp("Singapore");
        await homePage.clickOnAssessMyDropDown("India", "Singapore");
        expect(await homePage.waitForDateSelectionPage()).toBe(true);
        await homePage.setHomeDepartureDate("02/01/2023 10:20 PM");
        await homePage.setDestinationArrivalDate("03/01/2023 10:20 PM");
        await homePage.setDestinationDepartureDate("05/01/2023 10:20 PM");
        await homePage.setHomeArrivalDate("06/01/2023 10:20 PM");
        // await homePage.clickOnSaveAndContinueBtn();
        // await homePage.clickOnContinueToHomeBtn();
        // expect(await homePage.waitForTravelerPage()).toBe(true);
    })*/

});