import { expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

export class Login_MyTrips_Actions extends LoginPage {

    async openMyTripApplication() {
        await this.navigateToUrl();
    }

    async validateLandingPageBasicElements() {
        const loginText = "Enter your email address to get started with myTrips.  If you have not registered with us yet, we will guide you through the process."
        expect.soft(await this.IsLoginHeaderPresent()).toBe(true);
        expect.soft(await this.loginHelperText()).toEqual(loginText);
        expect.soft(await this.IsLoginHeaderPresent()).toBe(true);
        expect.soft(await this.loginHelperText()).toEqual(loginText);
        expect.soft(await this.IsLoginHeaderPresent()).toBe(true);
        expect.soft(await this.IsLoginEmailBoxPresent()).toBe(true);
        expect.soft(await this.isGetStartedoRSignBtnPresent()).toBe(true);
        expect.soft(await this.isGetStartedoRSignBtnEnabled()).toBe(true);
        expect.soft(await this.getStartedButtonText()).toBe("Get started");
    }

    async loginIntoMyTripApplication() {
        await this.setTextInEmailBox(process.env.mytripsuser);
        await this.clickOnGetStartedoRSignBtn();
        await this.waitForPasswordBox();
        expect.soft(await this.IsPasswordBoxPresent()).toBe(true);
        expect.soft(await this.isGetStartedoRSignBtnPresent()).toBe(true);
        expect.soft(await this.isGetStartedoRSignBtnEnabled()).toBe(true);
        expect.soft(await this.getStartedButtonText()).toBe("Sign in");
        await this.setTextInPasswordBox(process.env.mytripspassword);
        await this.clickOnGetStartedoRSignBtn();
    }

    async invalidLoginAttempts() {
        await this.clickOnGetStartedoRSignBtn();
        expect.soft(await this.getErrorMessageText('summary')).toBe("We were unable to log you in. Please check your details and try again.\n");
        await this.setTextInEmailBox('wrongCredentials@$$%.com');
        await this.clickOnGetStartedoRSignBtn();
        expect.soft(await this.getErrorMessageText('summary')).toBe("We were unable to log you in. Please check your details and try again.\n");
        await this.setTextInEmailBox('wrongCredentials');
        await this.clickOnGetStartedoRSignBtn();
        expect.soft(await this.getErrorMessageText('summary')).toBe("The Email field is not a valid e-mail address.\nWe were unable to log you in. Please check your details and try again.\n");
        expect.soft(await this.getErrorMessageText('field')).toBe("The Email field is not a valid e-mail address.");
        await this.setTextInEmailBox('prasadtrctauser1@qaprasad.com');
        const user = process.env.mytripsuser;
        const password = process.env.mytripspassword;
        process.env.mytripsuser = "prasadtrctauser1@qaprasad.com";
        process.env.localpassword = "12345";
        await this.loginIntoMyTripApplication();
        process.env.mytripsuser = user;
        process.env.mytripspassword = password;
        const errorMsg = await this.getErrorMessageText('summary');
        console.log(errorMsg);
        if(errorMsg === 'Account Locked\n'){
            expect.soft(errorMsg).toBe("Account Locked\n");
        }else{
            expect.soft(errorMsg).toBe("We were unable to log you in. Please check your details and try again.\n");
        }
        
    }

    async verifyLoginHelpText() {
        expect.soft(await this.IstroubleLoginLinkPresent()).toBe(true);
        await this.clickOnTroubleLoginLink();
        expect.soft(await this.getTroubleDialogHeaderText()).toBe("Having trouble logging in?");
        expect.soft(await this.getTroubleDialogBodyHeaderTxt()).toBe("Try the below options:");
        expect.soft(await this.getTroubleDialogBodyText(0)).toBe("Clear cache and cookies from your browser. Then completely close the browser and reopen it before trying to sign in again.");
        expect.soft(await this.getTroubleDialogBodyText(1)).toBe(`\n\t\t\tSign in to myTrips (https://qamytrips.vialto.com/) with your web browser in a private mode (this can sometimes be called an ‘Incognito’ window or an ‘InPrivate’ window).\n\t\t`);
        expect.soft(await this.getTroubleDialogBodyText(2)).toBe("\n\t\t\tTry signing in with a different web browser (for example Google Chrome, Internet Explorer or Firefox).\n\t\t");
        await this.clickOnOKBtnFrmTroubleDialog();
    }

}