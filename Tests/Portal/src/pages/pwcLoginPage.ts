import { expect } from '@playwright/test';
import pwcLoginLocators from "../../resources/pageLocators/pwcLocators/pwcLoginPage.json";
import { UIHelper } from '../helpers/ui-helpers';

export class PwcLoginPage extends UIHelper{
    async isLoginPresent() {
        return await this.isElementPresent(pwcLoginLocators.PageTitle);
    }

    async loginToPWCwithValidCredentials() {
        await this.filltheData(pwcLoginLocators.EmailTextBox, "saikat.bhowmick.tpr@vialto.com");
        await this.clickonWebElement(pwcLoginLocators.LoginButton);
    }
}