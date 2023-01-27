import { test, expect } from "@playwright/test";
import { ApiHelper } from "../../../src/helpers/api-helpers";
var OR = require("../../OR.json");
var OR_Header = require("../../headers.json");
var OR_payload = require("../../payloads.json");
import {Comparisions } from "../../../src/utils/comparisions";
import { Page } from "playwright";

const { Browser, BrowserContext, Page, chromium } = require("playwright");

const { Given, When, Then } = require("@cucumber/cucumber");



    Given('Open the Tiger Application and test the report', 
    async function () {
      const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext()
    const page = await context.newPage();
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

