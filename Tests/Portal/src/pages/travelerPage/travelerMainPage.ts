import { expect } from "@playwright/test";
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
        await this.page.getByRole('button', { name: "Create my trip from " + from + " to " + to }).click();
    }

    async waitForDateSelectionPage() {
        await this.waitTillElementIsVisible(tHomePageJson.mainPage.dateSelectionPage);
        return await this.isElementPresent(tHomePageJson.mainPage.dateSelectionPage);
    }

    async setHomeDepartureDate(fillData: String) {
        // await this.filltheData(tHomePageJson.mainPage.homedepertureDateBox, "");
        // await this.page.waitForTimeout(2000);
        // await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
        // await this.filltheData(tHomePageJson.mainPage.homedepertureDateBox, fillData);
        // await this.page.waitForTimeout(2000);
        // expect(await this.getHomeDepartureDate()).toBe(fillData);
        // await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
        await this.page.locator('#Trip_TripSegments_0__DepartureDate').click();
        await this.page.getByRole('cell', { name: ' Next Month' }).click();
        await this.page.getByRole('row', { name: '1 2 3 4 5 6 7' }).getByRole('cell', { name: '3' }).click();
        await this.page.getByRole('cell', { name: '' }).locator('a').click();
    }

    async getHomeDepartureDate() {
        return await this.page.inputValue(tHomePageJson.mainPage.homedepertureDateBox);
    }

    async setDestinationArrivalDate(fillData: String) {
        // await this.filltheData(tHomePageJson.mainPage.destinationarrivalDateBox, "");
        // await this.filltheData(tHomePageJson.mainPage.destinationarrivalDateBox, fillData);
        // expect(await this.getDestinationArrivalDate()).toBe(fillData);
        // await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
        await this.page.locator('#Trip_TripSegments_0__ArrivalDate').click();
        await this.page.getByRole('row', { name: '1 2 3 4 5 6 7' }).getByRole('cell', { name: '4' }).click();
        await this.page.getByRole('cell', { name: '' }).locator('a').click();
    }

    async getDestinationArrivalDate() {
        return await this.page.inputValue(tHomePageJson.mainPage.destinationarrivalDateBox);
    }

    async setDestinationDepartureDate(fillData: String) {
        // await this.filltheData(tHomePageJson.mainPage.destinationdepertureDateBox, fillData);
        // await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
        await this.page.locator('#Trip_TripSegments_1__DepartureDate').click();
        await this.page.getByRole('row', { name: '1 2 3 4 5 6 7' }).getByRole('cell', { name: '7' }).click();
        await this.page.getByRole('cell', { name: '' }).locator('a').click();
    }
    async setHomeArrivalDate(fillData: String) {
        await this.page.locator('#Trip_TripSegments_1__ArrivalDate').click();
        await this.page.getByRole('row', { name: '8 9 10 11 12 13 14' }).getByRole('cell', { name: '8' }).click();
        await this.page.getByRole('cell', { name: '' }).locator('a').click();
        // await this.filltheData(tHomePageJson.mainPage.homedarrivalDateBox, fillData);
        // await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
    }
    async clickOnSaveAndContinueBtn() {
        await this.clickonWebElement(tHomePageJson.mainPage.saveAndContinueBtn);
    }

    async clickOnContinueToHomeBtn() {
        await this.clickonWebElement(tHomePageJson.mainPage.continueToHomeBtn);
    }
}