import loginPageJson from '../../../resources/pageLocators/tigerLoginPage.json';
import { BasePage } from './basePage';
import robot from "robotjs";
export class LoginPage extends BasePage {

    async setTextInEmailBox(fillData: String) {
        await this.filltheData(loginPageJson.inputBoxes.email, fillData);
    }
    async clickOnLogInBtn() {
        return await this.clickonWebElement(loginPageJson.buttons.logInBtn);
    }

    async logintoTigerApplication() {
        await this.page.fill("input[name = 'ctl00$phCenter$txtEMAIL']", "anupama.pandey.tpr@vialto.com");

        //commenting as of now, due to unable to click on certificate popup
        // await this.page.locator("input[name = 'ctl00$phCenter$btnSubmitx']").click();
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(5000);
        await this.closeCertificationPopup()
    }

    async closeCertificationPopup() {
        // await this.page.mouse.move(400, 20)
        // await this.page.keyboard.press('Enter');
        robot.moveMouse(400, 20);
        robot.keyTap("enter");
    }

}