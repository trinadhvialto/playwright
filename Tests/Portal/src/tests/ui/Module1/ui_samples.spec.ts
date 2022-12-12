import { TestData } from "../../../utils/test_data";
import { TokenGenerators } from "../../../utils/token_generators";
import { test, expect } from "@playwright/test";
import { IotHubMethods } from "../../../utils/iothub_methods";
const { ApiHelper } = require("../../../helpers/api-helpers.js");
var OR = require("../../../../resources/OR.json");
var activationKeyHypervDeviceId = process.env.activationKeyHypervDeviceId;
const apimActivationKeyRequest =
  process.env.apimBaseURL + OR.APIUrls.sample_Get;
var activationKey,
  conn,
  token,
  customerDetailsId,
  deviceId,
  customerId,
  customerDetailsRecordSet,
  customer,
  activationStatus;

test.describe("Viewing Activation Key in WebUI", function () {
  test.beforeAll(async function () {});

  //US#177412
  test("sample UI test", async function ({ page }) {
    await page.goto("https://vialtopartners.com");
    // Click div:has-text("SolutionsTechnologyInsightsAbout UsCareersClient LoginContact Us") >> nth=3
    // await page.locator('div:has-text("SolutionsTechnologyInsightsAbout UsCareersClient LoginContact Us")').nth(3).click();
    // await expect(page).toHaveURL('https://vialtopartners.com/careers');
    // // Click span:has-text("Solutions")
    await page.locator('span:has-text("Solutions")').click();
    await expect(page).toHaveURL("https://vialtopartners.com/solutions");
    await page.getByRole("link", { name: "Contact Us" }).click();
    await page.getByPlaceholder("First Name").click();
    await page.getByPlaceholder("First Name").press("CapsLock");
    await page.getByPlaceholder("First Name").fill("D");
    await page.getByPlaceholder("First Name").press("CapsLock");
    await page.getByPlaceholder("First Name").fill("Demo1");
    await page.getByPlaceholder("First Name").press("Tab");
    await page.getByPlaceholder("Last Name").fill("demo2");
    await page.getByPlaceholder("Last Name").press("Tab");
    await page.getByPlaceholder("email@email.com").fill("email@gmail.com");
    await page.getByPlaceholder("email@email.com").press("Tab");
    await page.getByPlaceholder("Company").fill("vialtotest");
    await page.getByPlaceholder("Company").press("Tab");
    await page
      .getByRole("combobox", { name: "Location" })
      .selectOption("India");
  });

  //US#177412
  test("sample UI test Failure", async function ({ page }) {
    await page.goto(process.env.baseURL);
    await page.getByRole("cell").nth(1).click();
    await page
      .locator("#ctl00_phCenter_txtEMAIL")
      .fill("trinadh.kumar@vialto.com");
      await page.evaluate("document.getElementById('ctl00_phCenter_btnSubmitx').click()");

    await page.getByRole("link", { name: "Menu" }).click();

    await page.getByRole("heading", { name: " report" }).locator("a").click();
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByText("Export to Excel").click(),
    ]);



    await page.getByRole('link', { name: 'Trinadh Kumar' }).click();
    await page.getByText('Sign Out').click();
    await page.getByText('Sign Out').click();
  });
});
