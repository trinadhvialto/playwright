import loginPageJson from './../../../resources/mytrips/pageLocators/vialtoLoginPage.json';
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

    async getErrorMessageText(type:string) {
        return await this.getText(loginPageJson.errorMessage[type]);
    }

    async IstroubleLoginLinkPresent() {
        return await this.isElementPresent(loginPageJson.troubleLogginDialog.dialogLink);
    }

    async clickOnTroubleLoginLink() {
        return await this.clickonWebElement(loginPageJson.troubleLogginDialog.dialogLink);
    }

    async getTroubleDialogHeaderText() {
        return await this.getText(loginPageJson.troubleLogginDialog.dialogHeader);
    }

    async getTroubleDialogBodyHeaderTxt() {
        return await this.getText(loginPageJson.troubleLogginDialog.dialogbodyHeader);
    }

    async getTroubleDialogBodyText(index) {
        return await this.page.locator(loginPageJson.troubleLogginDialog.dialogBodyText).nth(index).textContent();
    }

    async clickOnOKBtnFrmTroubleDialog() {
        return await this.clickonWebElement(loginPageJson.troubleLogginDialog.okButton);
    }

}