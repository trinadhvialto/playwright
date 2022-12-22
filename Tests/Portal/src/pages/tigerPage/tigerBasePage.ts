import { UIHelper } from "../../helpers/ui-helpers";
import tigerBasePageLocators from "../../../resources/pageLocators/tigerLocators/tigerBasePage.json"

export class TigerBasePage extends UIHelper {
    async navigateToTigerHomePage() {
        await this.page.goto(process.env.tigerStageUrl);
    }

    async navigateToCreateNewEngagementPage() {
        await this.clickOnCreateNewMenuItem();
        await this.clickonWebElement(tigerBasePageLocators.newEngagement);
    }

    async clickOnCreateNewMenuItem() {
        await this.clickonWebElement(tigerBasePageLocators.menuButton);
        await this.clickonWebElement(tigerBasePageLocators.createNew);
    }
}