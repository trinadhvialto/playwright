import { TokenGenerators } from "../utils/api_axios";
import robot from "robotjs";

export class UIHelper {
    page: any;

    constructor(page: any) {
        this.page = page;
    }

    async filltheData(locator: any, data: any) {

        if (data) {
            await this.waitTillElementIsVisible(locator);
            await this.page.locator(locator).scrollIntoViewIfNeeded();
            await this.page.locator(locator).fill(data);

        }

    }

    async clickonWebElement(locator: any) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).click();

    }

    async getInnerHTML(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.innerHTML(locator);
    }


    async getInnerText(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).innerText().trim();
    }

    async getText(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).textContent();

    }

    async getAttribute(locator: any, attribute: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).getAttribute(attribute)

    }

    async evaluateJS(jsDOM: any) {
        return await this.page.evaluate(jsDOM);

    }


    async isElementPresent(locator: any) {
        // console.log(typeof locator.toString());
        let type = typeof locator;
        if (type === "string") {
            await this.page.locator(locator).scrollIntoViewIfNeeded();
            return await this.page.locator(locator).isVisible();
        } else if (type === "object") {
            return await locator.isVisible();
        }

        console.log(type);
        console.log(type.toString());

    }

    async isElementEnabled(locator: any) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).isEnabled();

    }

    async waitTillElementIsVisible(elementSelector: any, waitTime = 60000) {
        await this.page.waitForSelector(elementSelector, { waitFor: 'visible', timeout: waitTime })
    }

    async getIputBoxValue(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.inputValue();
    }
	
	async closeCertificationPopup() {
        await this.page.waitForTimeout(5000);
        robot.moveMouse(400, 20);
        robot.keyTap("enter");
    }

}