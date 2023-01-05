import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "./../supportFiles/custom-world";


Given("Login to MyTrips Application", async function (this: ICustomWorld) {
    await this.loginPage.navigateToUrl();
    const loginText = "Enter your email address to get started with myTrips.  If you have not registered with us yet, we will guide you through the process."
    expect.soft(await this.loginPage.IsLoginHeaderPresent()).toBe(true);
    expect(await this.loginPage.loginHelperText()).toEqual(loginText);
    expect(await this.loginPage.IsLoginHeaderPresent()).toBe(true);
    expect(await this.loginPage.loginHelperText()).toEqual(loginText);
    expect(await this.loginPage.IsLoginHeaderPresent()).toBe(true);
    expect(await this.loginPage.IsLoginEmailBoxPresent()).toBe(true);
    expect(await this.loginPage.isGetStartedoRSignBtnPresent()).toBe(true);
    expect(await this.loginPage.isGetStartedoRSignBtnEnabled()).toBe(true);
    expect(await this.loginPage.getStartedButtonText()).toBe("Get started");
    await this.loginPage.loginIntoMyTripApplication();
});

Then("Verify vialto logo, mytrips logo, Travel Overview, Trip History, Account Settings, Support and Sign Out are displayed in Navpane", async function (this: ICustomWorld) {
    expect(await this.homePage.IsVialtoLogoPresent()).toBe(true);
    expect(await this.homePage.IsMyTripsLogoPresent()).toBe(true);
    expect(await this.homePage.IsTravelerViewPresent()).toBe(true);
    expect(await this.homePage.isTripHistoryPresent()).toBe(true);
    expect(await this.homePage.isAccountSettingsPresent()).toBe(true);
    expect(await this.homePage.isSignOutPresent()).toBe(true);
});

When("select Home and Destinatio countires and select departure and Arrival dates", async function (this: ICustomWorld) {
    await this.homePage.openFromDropdownAndSelectOptionFromDrp("India");
    await this.homePage.openFromDropdownAndSelectOptionToDrp("Singapore");
    await this.homePage.clickOnAssessMyDropDown("India", "Singapore");
    expect(await this.homePage.waitForDateSelectionPage()).toBe(true);
    await this.homePage.setHomeDepartureDate("02/01/2023 10:20 PM");
    await this.homePage.setDestinationArrivalDate("03/01/2023 10:20 PM");
    await this.homePage.setDestinationDepartureDate("05/01/2023 10:20 PM");
    await this.homePage.setHomeArrivalDate("06/01/2023 10:20 PM");
});