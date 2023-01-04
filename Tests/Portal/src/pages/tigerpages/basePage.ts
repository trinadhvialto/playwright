var OR = require('../../../resources/OR.json');
import { UIHelper } from '../../helpers/ui-helpers';

export class BasePage extends UIHelper{
     

    async navigateToUrl() {
       const username = process.env.username
       //const  password = process.env.password

       const url = process.env.url;
        await this.page.goto(url);

        // console.log("Test is executing with user:- " + username);
        // var usernameElement = 'id=' + OR.locators.loginPage.usernameInput
        // await UIHelper.waitTillElementIsVisible(usernameElement)
        // await this.page.locator('id=' + OR.locators.loginPage.usernameInput).fill(username);

        //         await this.page.locator('id=' + OR.locators.loginPage.signInButton).click();

        // await this.page.locator('id=' + OR.locators.loginPage.passwordInput).fill(password);


        // Click input[name="ctl00\$phCenter\$txtEMAIL"]
   
        // await this.page.locator('id=' + OR.locators.loginPage.signInButton).click();
        // var userButton = 'id=' + OR.locators.homePage.userButton;
        // await this.waitTillElementIsVisible(userButton)
        // var loadSpinner = 'xpath=' + OR.locators.customerListPage.loadSpinner
        // await this.waitTillElementIsInvisible(loadSpinner)
        // await this.page.waitForTimeout(10000);

    }

 

    // async getColumnVal(column, table) {
    //     var index = await this.getColumnIndex(column, table)
    //     var locators = await (await table.elementHandle()).$$('xpath=' + "//tbody//td[" + index + "]")
    //     var columnValues = [];
    //     for (var i = 0; i < locators.length; i++) {
    //         await columnValues.push(await locators[i].innerText())
    //     }
    //     return columnValues;
    // }
    // // async getColumnIndex(column, table) {
    // //     var columnElements = await (await table.elementHandle()).$$('xpath=' + "//th");
    // //     for (var i = 0; i < columnElements.length; i++) {
    // //         if (column.toLowerCase() == (await columnElements[i].innerText()).toLowerCase()) {
    // //             return i + 1;
    // //         }
    // //     }
    // //     return 0;
    // // }

    // // async getRowText(row) {
    // //     var columnElements = await row.$$('xpath=' + ".//td");
    // //     var columns = [];
    // //     for (var i = 0; i < columnElements.length; i++) {
    // //         var text = await columnElements[i].innerText();
    // //         columns.push(text == '' ? 'null' : text.replace(/\n\n/g, ' ').trim())
    // //     }
    // //     return columns;
    // // }



}