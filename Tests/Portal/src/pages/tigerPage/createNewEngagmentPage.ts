import { UIHelper } from "../../helpers/ui-helpers";
import createNewEngagmentPageLocators from "../../../resources/pageLocators/tigerLocators/createNewEngagment.json"
import { Page } from "playwright";
let pages : Page;

export class CreateNewEngagmentPage extends UIHelper {
    async clickDismissButton() {
        await this.clickonWebElement(createNewEngagmentPageLocators.DismissButton);
    }

    async isCreateNewEngagmentPageOpen() {
        let pageHeader =  await this.getText(createNewEngagmentPageLocators.PageHeader);
        return (pageHeader == "Create New Engagement");
    }

    async createNewEngagement() {
        await this.filltheData(createNewEngagmentPageLocators.ClientTextBox, "Hastings");
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press("Enter");
        await this.filltheData(createNewEngagmentPageLocators.EngagementTextBox, "Test888");
        await this.clickonWebElement(createNewEngagmentPageLocators.PracticeTypeDropdown);
        await this.clickonWebElement(createNewEngagmentPageLocators.PracticeTypeChoice);
        await this.clickonWebElement(createNewEngagmentPageLocators.CoordinatingOfficeDropdown);
        await this.page.keyboard.type("I");
        await this.clickonWebElement(createNewEngagmentPageLocators.CoordinatingOfficeChoice);
        await this.clickonWebElement(createNewEngagmentPageLocators.CityDropdown);
        await this.page.keyboard.type("H");
        await this.clickonWebElement(createNewEngagmentPageLocators.CityChoice);
        await this.clickonWebElement(createNewEngagmentPageLocators.PrimaryContactDropdown);
        await this.page.keyboard.type("H");
        await this.clickonWebElement(createNewEngagmentPageLocators.PrimaryContactChoice);
        await this.filltheData(createNewEngagmentPageLocators.PrimaryContactPersonTextBox, "Muk");
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press("Enter");
        await this.clickonWebElement(createNewEngagmentPageLocators.EngagmentAdministratorDropdown);
        await this.clickonWebElement(createNewEngagmentPageLocators.EngagmentAdminsitratorChoice);
        await this.filltheData(createNewEngagmentPageLocators.EngagmentAdministratorTextBox, "Muk");
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press("Enter");
        await this.clickonWebElement(createNewEngagmentPageLocators.CreateEngagmentButton);
    }
}