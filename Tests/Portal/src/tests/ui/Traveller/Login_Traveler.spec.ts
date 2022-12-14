import { test, expect, Page } from '@playwright/test';
import { TravelHomePage } from '../../../pages/travelerPage/travelerMainPage';
import { LoginPage } from './../../../pages/loginPage';



let basepage: any;
let homePage: any;
let page: Page;
let noOfTimesLaunched = 0;


test.describe("Login to Traveler and book a trip", function () {
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async function ({ browser }) {

        if (!page && !noOfTimesLaunched) {
            page = await browser.newPage();
            basepage = new LoginPage(page);
            homePage = new TravelHomePage(page);
            basepage.navigateToUrl();
            noOfTimesLaunched = noOfTimesLaunched + 1;
        }
    });

    test('Navigate to MyTrips Travelers Page and verify expected elements are displayed', async () => {
        const loginText = "Enter your email address to get started with myTrips.  If you have not registered with us yet, we will guide you through the process."
        expect(await basepage.IsLoginHeaderPresent()).toBe(true);
        expect(await basepage.loginHelperText()).toEqual(loginText);
        expect(await basepage.IsLoginHeaderPresent()).toBe(true);
        expect(await basepage.IsLoginEmailBoxPresent()).toBe(true);
        expect(await basepage.isGetStartedoRSignBtnPresent()).toBe(true);
        expect(await basepage.isGetStartedoRSignBtnEnabled()).toBe(true);
        expect(await basepage.getStartedButtonText()).toBe("Get started");

    });

    test("Login into MyTrips application with Traveler account", async () => {
        await basepage.setTextInEmailBox("traveler1@mytripqa.com");
        await basepage.clickOnGetStartedoRSignBtn();
        await basepage.waitForPasswordBox();
        expect(await basepage.IsPasswordBoxPresent()).toBe(true);
        expect(await basepage.isGetStartedoRSignBtnPresent()).toBe(true);
        expect(await basepage.isGetStartedoRSignBtnEnabled()).toBe(true);
        expect(await basepage.getStartedButtonText()).toBe("Sign in");
        await basepage.setTextInPasswordBox("Test@1234");
        await basepage.clickOnGetStartedoRSignBtn();
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

    test("Create a trip with Home and Destination with valid dates ", async () => {
        await homePage.openFromDropdownAndSelectOptionFromDrp("India");
        await homePage.openFromDropdownAndSelectOptionToDrp("Singapore");
        await homePage.clickOnAssessMyDropDown("India", "Singapore");
        expect(await homePage.waitForDateSelectionPage()).toBe(true);
        await homePage.setHomeDepartureDate("02/01/2023 10:20 PM");
        await homePage.setDestinationArrivalDate("03/01/2023 10:20 PM");
        await homePage.setDestinationDepartureDate("05/01/2023 10:20 PM");
        await homePage.setHomeArrivalDate("06/01/2023 10:20 PM");
        await homePage.clickOnSaveAndContinueBtn();
    })

});