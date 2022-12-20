import { test, expect, Page } from '@playwright/test';
import { TravelHomePage } from '../../../pages/travelerPage/travelerHomePage';
import { LoginPage } from './../../../pages/loginPage';


let loginpage: LoginPage;
let homePage: TravelHomePage;
let page: Page;
let noOfTimesLaunched = 0;

test.describe("Login to Traveler and book a trip", function () {
    test.describe.configure({ mode: 'serial' });
    test.beforeAll(async function ({ browser }) {
        if (!page && !noOfTimesLaunched) {
            page = await browser.newPage();
            loginpage = new LoginPage(page);
            homePage = new TravelHomePage(page);
            loginpage.navigateToMyTripsPage();
            noOfTimesLaunched = noOfTimesLaunched + 1;
        }
    });

    test('Navigate to MyTrips Travelers Page and verify expected elements are displayed', async () => {
        const loginText = "Enter your email address to get started with myTrips.  If you have not registered with us yet, we will guide you through the process."
        expect.soft(await loginpage.IsLoginHeaderPresent()).toBe(true);
        test.step('Steps1', async () => {
            expect(await loginpage.loginHelperText()).toEqual(loginText);
            expect(await loginpage.IsLoginHeaderPresent()).toBe(true);
        });
        expect(await loginpage.loginHelperText()).toEqual(loginText);
        expect(await loginpage.IsLoginHeaderPresent()).toBe(true);
        expect(await loginpage.IsLoginEmailBoxPresent()).toBe(true);
        expect(await loginpage.isGetStartedoRSignBtnPresent()).toBe(true);
        expect(await loginpage.isGetStartedoRSignBtnEnabled()).toBe(true);
        expect(await loginpage.getStartedButtonText()).toBe("Get started");

    });

    test("Login into MyTrips application with Traveler account", async () => {
        loginpage.loginIntoMyTripApplication();
        expect(await homePage.waitForTravelerPage()).toBe(true);
    });

    test("Verify vialto logo, mytrips logo, Travel Overview, Trip History, Account Settings, Support and Sign Out are displayed in Navpane", async () => {
        expect(await homePage.IsVialtoLogoPresent()).toBe(true);
        expect(await homePage.IsMyTripsLogoPresent()).toBe(true);
        expect(await homePage.IsTravelerViewPresent()).toBe(true);
        expect(await homePage.isTripHistoryPresent()).toBe(true);
        expect(await homePage.isAccountSettingsPresent()).toBe(true);
        expect(await homePage.isSignOutPresent()).toBe(true);
    });

    test("Create a trip with Home and Destination with valid dates", async () => {
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
    })

});