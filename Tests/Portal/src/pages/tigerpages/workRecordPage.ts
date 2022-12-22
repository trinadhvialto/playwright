import { expect } from "@playwright/test";
import { BasePage } from "./base_page";
import * as homePageJson from "../../../resources/pageLocators/tigerHomePage.json";
import * as wrPageJson from "../../../resources/pageLocators/tigerWorkRecod.json";

export class WorkRecordPage extends BasePage {

    async waitForWorkRecordPage() {
        await this.waitTillElementIsVisible(wrPageJson.wrPage.questionnaire_send);
        return await this.isElementPresent(wrPageJson.wrPage.questionnaire_send);
        //expect(await this.waitForTigerPage()).toBe(true);
        
    }

    async clickOnSendQuestionnaire() {
        return await this.clickonWebElement(wrPageJson.wrPage.questionnaire_send);
    }
}
