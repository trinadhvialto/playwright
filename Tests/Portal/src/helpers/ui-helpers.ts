import { TokenGenerators } from "../utils/token_generators";

export class UIHelper {
    static page: any;

    static async filltheData(locator: any, data: any) {

        if (data) {
            await this.waitTillElementIsVisible(locator);
            await this.page.locator(locator).scrollIntoViewIfNeeded();
            await this.page.locator(locator).fill(data);

        }

    }

    static async clickonWebElement(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        await this.page.locator(locator).click();

    }

    static async getInnerHTML(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.innerHTML(locator);
    }


    static async getInnerText(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).innerText().trim();
    }

    static async getText(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).textContent();

    }

    static async getAttribute(locator: any, attribute: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).getAttribute(attribute)

    }

    static async evaluateJS(jsDOM: any) {
        return await this.page.evaluate(jsDOM);

    }


    static async isElementPresent(locator: any) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).isVisible();

    }

    static async waitTillElementIsVisible(elementSelector: any, waitTime = 60000) {
        await this.page.waitForSelector(elementSelector, { waitFor: 'visible', timeout: waitTime })
    }

}