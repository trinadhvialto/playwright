import { expect } from "@playwright/test";
import { UIHelper } from "../../helpers/ui-helpers";
import travellerHomePageJson from "../../../resources/pageLocators/travellerLocators/mytripTravalerHomePage.json";

export class  TravelHomePage extends UIHelper {
    async waitForTravelerPage() {
        await this.waitTillElementIsVisible(travellerHomePageJson.mainPage.homePage);
        return await this.isElementPresent(travellerHomePageJson.mainPage.homePage);
    }

    async IsVialtoLogoPresent() {
        return await this.isElementPresent(travellerHomePageJson.toolbar.vialtoLogo);
    }

    async IsMyTripsLogoPresent() {
        return await this.isElementPresent(travellerHomePageJson.toolbar.myTripsLogo);
    }

    async IsTravelerViewPresent() {
        return await this.isElementPresent(this.page.getByRole('link', { name: 'Travel Overview' }));
    }

    async isTripHistoryPresent() {
        return await this.isElementPresent(this.page.getByRole('link', { name: 'Trip History' }));
    }

    async isAccountSettingsPresent() {
        return await this.isElementPresent(this.page.getByRole('link', { name: 'Account Settings' }));
    }

    async isSignOutPresent() {
        return await this.isElementPresent(travellerHomePageJson.toolbar.signOut);
    }
    async openFromDropdownAndSelectOptionFromDrp(option: String) {
        await this.clickonWebElement(travellerHomePageJson.mainPage.fromDropDown);
        await this.filltheData(travellerHomePageJson.mainPage.comboInputBox, option);
        await this.page.getByRole('option', { name: option }).nth(0).click();
    }

    async openFromDropdownAndSelectOptionToDrp(option: String) {
        await this.clickonWebElement(travellerHomePageJson.mainPage.toDropDown);
        await this.filltheData(travellerHomePageJson.mainPage.comboInputBox, option);
        await this.page.getByRole('option', { name: option }).nth(0).click();
    }

    async clickOnAssessMyDropDown(from: String, to: String) {
        await this.page.getByRole('button', { name: "Assess my trip from " + from + " to " + to }).click();
    }

    async waitForDateSelectionPage() {
        await this.waitTillElementIsVisible(travellerHomePageJson.mainPage.dateSelectionPage);
        return await this.isElementPresent(travellerHomePageJson.mainPage.dateSelectionPage);
    }

    async setHomeDepartureDate(fillData: String) {
        await this.page.locator(travellerHomePageJson.mainPage.homedepertureDateBox).clear();
        await this.filltheData(travellerHomePageJson.mainPage.homedepertureDateBox, fillData);
        expect(await this.getHomeDepartureDate()).toBe(fillData);
        await this.clickonWebElement(travellerHomePageJson.mainPage.enterTripDetailPageHeader);
    }

    async getHomeDepartureDate() {
        return await this.page.inputValue(travellerHomePageJson.mainPage.homedepertureDateBox);
    }

    async setDestinationArrivalDate(fillData: String) {
        await this.page.locator(travellerHomePageJson.mainPage.destinationarrivalDateBox).clear();
        await this.filltheData(travellerHomePageJson.mainPage.destinationarrivalDateBox, fillData);
        expect(await this.getDestinationArrivalDate()).toBe(fillData);
        await this.clickonWebElement(travellerHomePageJson.mainPage.enterTripDetailPageHeader);
    }

    async getDestinationArrivalDate() {
        return await this.page.inputValue(travellerHomePageJson.mainPage.destinationarrivalDateBox);
    }

    async setDestinationDepartureDate(fillData: String) {
        await this.page.locator(travellerHomePageJson.mainPage.destinationdepertureDateBox).clear();
        await this.filltheData(travellerHomePageJson.mainPage.destinationdepertureDateBox, fillData);
        expect(await this.getDestinationDepartureDate()).toBe(fillData);
        await this.clickonWebElement(travellerHomePageJson.mainPage.enterTripDetailPageHeader);
    }

    async getDestinationDepartureDate() {
        return await this.page.inputValue(travellerHomePageJson.mainPage.destinationdepertureDateBox);
    }
    async setHomeArrivalDate(fillData: String) {
        await this.page.locator(travellerHomePageJson.mainPage.homedarrivalDateBox).clear();
        await this.filltheData(travellerHomePageJson.mainPage.homedarrivalDateBox, fillData);
        expect(await this.getHomeArrivalDate()).toBe(fillData);
        await this.clickonWebElement(travellerHomePageJson.mainPage.enterTripDetailPageHeader);
    }

    async getHomeArrivalDate() {
        return await this.page.inputValue(travellerHomePageJson.mainPage.homedarrivalDateBox);
    }
    async clickOnSaveAndContinueBtn() {
        await this.clickonWebElement(travellerHomePageJson.mainPage.saveAndContinueBtn);
    }

    async clickOnContinueToHomeBtn() {
        await this.clickonWebElement(travellerHomePageJson.mainPage.continueToHomeBtn);
    }
}