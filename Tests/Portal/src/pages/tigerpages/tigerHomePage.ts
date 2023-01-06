import { expect } from "@playwright/test";
import { BasePage } from "./basePage";
import * as homePageJson from "../../../resources/pageLocators/tigerHomePage.json";
import * as wrPageJson from "../../../resources/pageLocators/tigerWorkRecod.json";
import * as searchPageJson from "../../../resources/pageLocators/tigerSearchPage.json"



export class TigerHomePage extends BasePage {
    async waitForTigerPage() {
        await this.waitTillElementIsVisible(homePageJson.mainPage.menu);
        return await this.isElementPresent(homePageJson.mainPage.menu);
        //expect(await this.waitForTigerPage()).toBe(true);
        
    }

   async  isMenuPresent() {
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



    async clickAcceptAllCookies() {
        await this.clickonWebElement(wrPageJson.buttons.acceptAllCookies);
        
    }

    async isSearchBoxPresent() {
        return await this.isElementPresent(searchPageJson.search.search_text);
    }

    async selectSearchType(type:String) {
        await this.clickonWebElement(searchPageJson.search.sreach_type);
        await this.page.locator(searchPageJson.search.ulLocator).locator(searchPageJson.search.liLocator).filter({hasText: `${type}`}).click();
    }

    async enterSearchText(text:String) {
        await this.filltheData(searchPageJson.search.search_text, text);
        await this.clickonWebElement(searchPageJson.search.search_icon);
    }

    async selectDataRow(text:String) {
        //await this.page.locator(searchPageJson.search.search_table).locator('tr:has-text("576567")').click();
    
        //await this.page.locator(searchPageJson.search.search_table).locator('tr:{has-text("576567")').click();
       await this.page.locator(searchPageJson.search.search_table).locator('tr').filter({hasText: `${text}`}).click();
    }


}
