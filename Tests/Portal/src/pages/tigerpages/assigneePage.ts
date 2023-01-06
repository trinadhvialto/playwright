import { expect } from "@playwright/test";
import { BasePage } from "./basePage";
import * as homePageJson from "../../../resources/pageLocators/tigerHomePage.json";
import * as wrPageJson from "../../../resources/pageLocators/tigerWorkRecod.json";
import * as searchPageJson from "../../../resources/pageLocators/tigerSearchPage.json"
import * as assigneePageJson from "../../../resources/pageLocators/assigneePage.json"



export class TigerAssigneePage extends BasePage {

    async waitForAssigneePage() {
        await this.waitTillElementIsVisible(searchPageJson.assignee_page.assignee_name);
        return await this.isElementPresent(searchPageJson.assignee_page.assignee_name);
        //expect(await this.waitForTigerPage()).toBe(true);
        
    }

    async isAssigneeIdPresent() {
        return await this.isElementPresent(searchPageJson.assignee_page.assignee_name);
        //expect(await this.waitForTigerPage()).toBe(true);
        
    }

    // async clickOnImpersonate() {
    //     await this.clickonWebElement(assigneePageJson.assignee_page.impersonate);
    //     //expect(await this.waitForTigerPage()).toBe(true);
        
    // }






}
