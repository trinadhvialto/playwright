const { test, expect } = require("@playwright/test");
const { ApiHelper } = require("../../../src/helpers/api-helpers.js");
var OR = require("../../OR.json");
var OR_Header = require("../../headers.json");
var OR_payload = require("../../payloads.json");
const {Comparisions }= require("../../../src/utils/comparisions.js");
const { page } = require("playwright");

const { Browser, BrowserContext, Page, chromium } = require("playwright");

const { Given, When, Then } = require("@cucumber/cucumber");



    Given('Open the Tiger Application and test the report', 
    async function () {
      browser = await chromium.launch({
        headless: false
    });
    context = await browser.newContext()
    page = await context.newPage();
        await page.goto('https://fedsvc-stage.pwc.com/ofiss/public/HRD.aspx#/search-home');
        await page.getByRole('cell').nth(1).click();
        await page.locator('#ctl00_phCenter_txtEMAIL').fill('trinadh.kumar@vialto.com');
      
        await page.getByRole('link', { name: 'Menu' }).click();
       
        await page.getByRole('heading', { name: ' report' }).locator('a').click();
        const [download] = await Promise.all([
          page.waitForEvent('download'),
          page.getByText('Export to Excel').click()]);
      }
    );

