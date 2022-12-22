import { expect } from "@playwright/test";
import { TigerBasePage } from "../tigerPage/tigerBasePage";
import tigerBasePageLocators from "../../../resources/pageLocators/tigerLocators/tigerBasePage.json"
import tigerHomePageLocators from "../../../resources/pageLocators/tigerLocators/tigerHomePage.json"

export class TigerHomePage extends TigerBasePage {
    async acceptAllCookies() {
        await this.clickonWebElement(tigerHomePageLocators.AcceptAllCookiesButton);
    }
}