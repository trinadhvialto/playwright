const { TokenGenerators } = require('../../utils/token_generators.js');

exports.UIHelper = class UIHelper {

    static async filltheData(locator, data) {

        if (data) {
            await this.waitTillElementIsVisible(locator);
            await this.page.locator(locator).scrollIntoViewIfNeeded();
            await this.page.locator(locator).fill(data);

        }

    }

    static async clickonWebElement(locator) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        await this.page.locator(locator).click();

    }

    static async getInnerHTML(locator) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.innerHTML(locator);
    }


    static async getInnerText(locator) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).innerText().trim();
    }

    static async getText(locator) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).textContent();

    }

    static async getAttribute(locator, attribute) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).getAttribute(attribute)

    }

    static async evaluateJS(jsDOM) {
        return await this.page.evaluate(jsDOM);

    }


    static async isElementPresent(locator) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).isVisible();

    }

    static async waitTillElementIsVisible(elementSelector, waitTime = 60000) {
        await this.page.waitForSelector(elementSelector, { waitFor: 'visible', timeout: waitTime })
    }

}