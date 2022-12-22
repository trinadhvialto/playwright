import { expect } from "@playwright/test";
import { BasePage } from "./base_page";
import * as homePageJson from "../../../resources/pageLocators/tigerHomePage.json";
import * as wrPageJson from "../../../resources/pageLocators/tigerWorkRecod.json";



export class TigerHomePage extends BasePage {
    async waitForTigerPage() {
        await this.waitTillElementIsVisible(homePageJson.mainPage.menu);
        return await this.isElementPresent(homePageJson.mainPage.menu);
        //expect(await this.waitForTigerPage()).toBe(true);
        
    }

    async isMenuPresent() {
        return await this.isElementPresent(homePageJson.mainPage.menu);
    }
    async clickOnMenu() {
        return await this.clickonWebElement(homePageJson.mainPage.menu);
    }

    async isCreateNewOptionPresent() {
        return await this.isElementPresent(homePageJson.mainPage.createNew);
    }

    async clickOnCreateNewOption() {
        return await this.clickonWebElement(homePageJson.mainPage.createNew);
    }

    async isWorkRecordOptionPresent() {
        return await this.isElementPresent(homePageJson.mainPage.workRecord);
    }
    async clickOnWorkRecordOption() {
        return await this.clickonWebElement(homePageJson.mainPage.workRecord);
    }

    async selectAssignee(assignee: String, index: Number) {
        await this.filltheData(wrPageJson.wrPage.assignee_name, assignee);
        await this.page.locator(wrPageJson.wrPage.assigneefromdropdown).nth(index).click();
    }

   
    async selectEngagement(engagement:String) {
        await this.clickonWebElement(wrPageJson.wrPage.engagement);
       // await this.page.locator(wrPageJson.wrPage.optionsfromdropdown)
        //await this.page.locator(wrPageJson.wrPage.optionsfromdropdown).nth(index).click();
        await this.page.locator(wrPageJson.wrPage.ulLocator).locator(wrPageJson.wrPage.liLocator).filter({hasText: `${engagement}`}).click();
        
     
        
    }
    
    async selectWorkRecordType(type:String) {
        await this.clickonWebElement(wrPageJson.wrPage.work_record_type);
        //await this.page.locator(wrPageJson.wrPage.optionsfromdropdown)
       //.filter({ has: this.page.locator(`text="${option}"`) }).click();
        //await this.page.locator(wrPageJson.wrPage.optionsfromdropdown).nth(index).click();
        await this.page.locator(wrPageJson.wrPage.ulLocator).locator(wrPageJson.wrPage.liLocator).filter({hasText: `${type}`}).click();
    }
    async selectCountry(country:String) {
        await this.clickonWebElement(wrPageJson.wrPage.country);
        await this.page.locator(wrPageJson.wrPage.ulLocator).locator(wrPageJson.wrPage.liLocator).filter({hasText: `${country}`}).click();
    }

    async selectYear(year:String) {
        await this.clickonWebElement(wrPageJson.wrPage.year);
        await this.page.locator(wrPageJson.wrPage.ulLocator).locator(wrPageJson.wrPage.liLocator).filter({hasText: `${year}`}).click();
    }


    async selectPrimaryService(serviceName:String) {
       
        await this.clickonWebElement(wrPageJson.wrPage.primary_service);
        await this.page.locator(wrPageJson.wrPage.ulLocator).locator(wrPageJson.wrPage.liLocator).filter({hasText: `${serviceName}`}).click();
        // await this.page.locator(wrPageJson.wrPage.optionsfromdropdown).nth(index).click();
        
    }

    async selectQuestionnaire(question_set:String) {
        await this.clickonWebElement(wrPageJson.wrPage.question_set);
        await this.page.locator(wrPageJson.wrPage.ulLocator).locator(wrPageJson.wrPage.liLocator).filter({hasText: `${question_set}`}).click();
    }

    async selectDueDate(date:String) {
        await this.filltheData(wrPageJson.wrPage.due_date, date);
    
    }

    async selectQuestionnaireConatct(contact_name:String) {
        await this.filltheData(wrPageJson.wrPage.questionnaire_contact, contact_name);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        
    }
    

    async clickOnCreateButton() {
        await this.clickonWebElement(wrPageJson.buttons.btnCreate);
        
    }

    async clickAcceptAllCookies() {
        await this.clickonWebElement(wrPageJson.buttons.acceptAllCookies);
        
    }

}
