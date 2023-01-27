import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../../../cucumber_supportFiles/custom-world";


Given("Navigate to MyTrips Travelers Page and verify expected elements are displayed", async function (this: ICustomWorld) {
    await this.loginActions.openMyTripApplication();
    await this.loginActions.validateLandingPageBasicElements();
    await this.loginActions.invalidLoginAttempts();
});

Then("Login into MyTrips application with Traveler account", async function (this: ICustomWorld) {
    await this.loginActions.verifyLoginHelpText();
    await this.loginActions.loginIntoMyTripApplication();
   // expect(await homePage.waitForTravelerPage()).toBe(true);
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