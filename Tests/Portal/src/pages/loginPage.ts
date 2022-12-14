import loginPageJson from './../../resources/pageLocators/vialtoLoginPage.json';
import { BasePage } from './base_page';

export class LoginPage extends BasePage {

    async IsLoginHeaderPresent() {
        return await this.isElementPresent(loginPageJson.toolbars.loginHeader);
    }

    async IsLoginEmailBoxPresent() {
        return await this.isElementPresent(loginPageJson.inputBoxes.email);
    }

    async setTextInEmailBox(fillData: String) {
        await this.filltheData(loginPageJson.inputBoxes.email, fillData);
    }

    async isGetStartedoRSignBtnPresent() {
        return await this.isElementPresent(loginPageJson.buttons.getStartedSigninBtn);
    }

    async isGetStartedoRSignBtnEnabled() {
        return await this.isElementEnabled(loginPageJson.buttons.getStartedSigninBtn);
    }

    async clickOnGetStartedoRSignBtn() {
        return await this.clickonWebElement(loginPageJson.buttons.getStartedSigninBtn);
    }

    async loginHelperText() {
        return await this.getText(loginPageJson.mainPage.loginHelpText);
    }

    async getStartedButtonText() {
        return await this.getText(loginPageJson.buttons.getStartedSigninBtn);
    }

    async waitForPasswordBox() {
        await this.waitTillElementIsVisible(loginPageJson.inputBoxes.password);
    }

    async IsPasswordBoxPresent() {
        return await this.isElementPresent(loginPageJson.inputBoxes.password);
    }

    async setTextInPasswordBox(fillData: String) {
        await this.filltheData(loginPageJson.inputBoxes.password, fillData);
    }

}