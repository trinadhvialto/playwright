import { BasePage, expect } from "../../../index";
import tHomePageJson from "../../../../../resources/mytrips/pageLocators/travelerAndClientAdminDashboardPage/travelerHome/mytripTravalerHomePage.json";

export class MytripTravalerHomePage extends BasePage{
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
        await this.page.locator(tHomePageJson.mainPage.homedepertureDateBox).clear();
        await this.filltheData(tHomePageJson.mainPage.homedepertureDateBox, fillData);
        expect(await this.getHomeDepartureDate()).toBe(fillData);
        await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
    }

    async getHomeDepartureDate() {
        return await this.page.inputValue(tHomePageJson.mainPage.homedepertureDateBox);
    }

    async setDestinationArrivalDate(fillData: String) {
        await this.page.locator(tHomePageJson.mainPage.destinationarrivalDateBox).clear();
        await this.filltheData(tHomePageJson.mainPage.destinationarrivalDateBox, fillData);
        expect(await this.getDestinationArrivalDate()).toBe(fillData);
        await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
    }

    async getDestinationArrivalDate() {
        return await this.page.inputValue(tHomePageJson.mainPage.destinationarrivalDateBox);
    }

    async setDestinationDepartureDate(fillData: String) {
        await this.page.locator(tHomePageJson.mainPage.destinationdepertureDateBox).clear();
        await this.filltheData(tHomePageJson.mainPage.destinationdepertureDateBox, fillData);
        expect(await this.getDestinationDepartureDate()).toBe(fillData);
        await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
    }

    async getDestinationDepartureDate() {
        return await this.page.inputValue(tHomePageJson.mainPage.destinationdepertureDateBox);
    }
    async setHomeArrivalDate(fillData: String) {
        await this.page.locator(tHomePageJson.mainPage.homedarrivalDateBox).clear();
        await this.filltheData(tHomePageJson.mainPage.homedarrivalDateBox, fillData);
        expect(await this.getHomeArrivalDate()).toBe(fillData);
        await this.clickonWebElement(tHomePageJson.mainPage.enterTripDetailPageHeader);
    }

    async getHomeArrivalDate() {
        return await this.page.inputValue(tHomePageJson.mainPage.homedarrivalDateBox);
    }
    async clickOnSaveAndContinueBtn() {
        await this.clickonWebElement(tHomePageJson.mainPage.saveAndContinueBtn);
    }

    async clickOnContinueToHomeBtn() {
        await this.clickonWebElement(tHomePageJson.mainPage.continueToHomeBtn);
    }

    async createATrip(numberOfsegs, numberOfStay, futureDated, pastDated) {
        /*
        1. create a number segments
        2. select home country destination country
        3. calculated number of stay based future or pastdated trip
        4. enter dates in input boxes
        5. click on saveAndContinue
        */

    }

    async VerifyAssessment(assesmentConfiguration: object){
        /*
        1. find the type of assessment
        2. based on assessment type call the appropriate function
        3. if questionary is enabled call questionary
        */
    }

    async fillTheQuestionnaire(questionanaire:object){
        /*
        1. fill the questionnaire
        */
    }

    async verifyTripAdded(){
        /*
        1. verify trip is added
        */
    }
}