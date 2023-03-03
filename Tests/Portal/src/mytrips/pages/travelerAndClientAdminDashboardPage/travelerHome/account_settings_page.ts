import { expect, BasePage, accountsettingspagejson, mytriptravalerhomepagejson } from "../../..";

export class AccountSettingsPage extends BasePage{
    async navigateToAccountSettings(){
        await this.clickonWebElement(mytriptravalerhomepagejson.accountSettingsLink);
    }
    async verifyTravelProfileDetails(homecountry:string){
        await this.getElementRefByRole("link", "Traveler Profile");
        expect(await this.getText(accountsettingspagejson.travelerProfile.homeOfficeLocation)).toBe(homecountry)
    }
}