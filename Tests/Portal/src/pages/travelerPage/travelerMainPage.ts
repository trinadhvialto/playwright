import { BasePage } from "../base_page";
import tHomePageJson from "./../../../resources/pageLocators/mytripTravalerHomePage.json";

export class TravelHomePage extends BasePage {
    async waitForTravelerPage() {
        await this.waitTillElementIsVisible(tHomePageJson.mainPage.homePage);
        return await this.isElementPresent(tHomePageJson.mainPage.homePage);
    }

    async IsVialtoLogoPresent() {
        return await this.isElementPresent(tHomePageJson.toolbar.vialtoLogo);
    }

    async IsMyTripsLogoPresent() {
        return await this.isElementPresent(tHomePageJson.toolbar.myTripsLogo);
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
        return await this.isElementPresent(tHomePageJson.toolbar.signOut);
    }
    async openFromDropdownAndSelectOptionFromDrp(option: String) {
        await this.clickonWebElement(tHomePageJson.mainPage.fromDropDown);
        await this.filltheData(tHomePageJson.mainPage.comboInputBox, option);
        await this.page.getByRole('option', { name: option }).nth(0).click();
    }

    async openFromDropdownAndSelectOptionToDrp(option: String) {
        await this.clickonWebElement(tHomePageJson.mainPage.toDropDown);
        await this.filltheData(tHomePageJson.mainPage.comboInputBox, option);
        await this.page.getByRole('option', { name: option }).nth(0).click();
    }

    async clickOnAssessMyDropDown(from: String, to: String) {
        await this.page.getByRole('button', { name: "Assess my trip from " + from + " to " + to }).click();
    }

    async waitForDateSelectionPage() {
        await this.waitTillElementIsVisible(tHomePageJson.mainPage.dateSelectionPage);
        return await this.isElementPresent(tHomePageJson.mainPage.dateSelectionPage);
    }

    async setHomeDepartureDate(fillData: String) {
        await this.filltheData(tHomePageJson.mainPage.homedepertureDateBox, fillData);
        await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
    }
    async setDestinationArrivalDate(fillData: String) {
        await this.filltheData(tHomePageJson.mainPage.destinationarrivalDateBox, fillData);
        await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
    }

    async setDestinationDepartureDate(fillData: String) {
        await this.filltheData(tHomePageJson.mainPage.destinationdepertureDateBox, fillData);
        await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
    }
    async setHomeArrivalDate(fillData: String) {
        await this.filltheData(tHomePageJson.mainPage.homedarrivalDateBox, fillData);
        await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
    }
    async clickOnSaveAndContinueBtn() {
        await this.clickonWebElement(tHomePageJson.mainPage.saveAndContinueBtn);
    }
}