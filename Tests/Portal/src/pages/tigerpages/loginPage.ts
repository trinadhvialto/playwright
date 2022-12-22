import { expect } from '@playwright/test';
import loginPageJson from '../../../resources/pageLocators/tigerLoginPage.json';
import { BasePage } from './base_page';

export class LoginPage extends BasePage {

    async setTextInEmailBox(fillData: String) {
        await this.filltheData(loginPageJson.inputBoxes.email, fillData);
    }
    async clickOnLogInBtn() {
        return await this.clickonWebElement(loginPageJson.buttons.logInBtn);
    }

    async logintoTigerApplication() {
        // await this.setTextInEmailBox(process.env.localuser);
        // await this.clickOnLogInBtn();
        await this.page.fill("input[name = 'ctl00$phCenter$txtEMAIL']", "anupama.pandey.tpr@vialto.com");
        await this.page.locator("input[name = 'ctl00$phCenter$btnSubmitx']").click();
    }

}