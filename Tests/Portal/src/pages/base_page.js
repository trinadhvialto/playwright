var OR = require('../../resources/OR.json');

exports.BasePage = class BasePage {

    constructor(page) {
        this.page = page;
    }

    async navigateToUrl() {
       var username = process.env.username
       var  password = process.env.password

       var url = process.env.adminAppBaseURL;
        await this.page.goto(url);

        console.log("Test is executing with user:- " + username);
        var usernameElement = 'id=' + OR.locators.loginPage.usernameInput
        await this.waitTillElementIsVisible(usernameElement)
        await this.page.locator('id=' + OR.locators.loginPage.usernameInput).fill(username);
        await this.page.locator('id=' + OR.locators.loginPage.passwordInput).fill(password);
        await this.page.locator('id=' + OR.locators.loginPage.signInButton).click();
        var userButton = 'id=' + OR.locators.homePage.userButton;
        await this.waitTillElementIsVisible(userButton)
        var loadSpinner = 'xpath=' + OR.locators.customerListPage.loadSpinner
        await this.waitTillElementIsInvisible(loadSpinner)
        await this.page.waitForTimeout(10000);

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