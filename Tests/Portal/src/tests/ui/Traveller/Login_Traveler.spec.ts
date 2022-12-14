import {test, expect} from '@playwright/test';
import loginPageJson from './../../../../resources/pageLocators/vialtoLoginPage.json';
import { BasePage2 } from '../../../pages/base_page2';
import { url } from 'inspector';
let basepage= require('../../../pages/base_page2');


let page: any;


test.describe("Login to Traveler", function (){
    test.describe.configure({ mode: 'serial' });
    
  


    test.beforeEach(async function ({page}) {

      basepage = new BasePage2(page);
     

      basepage.navigateToUrl(process.env.url)

    })
    
    test.afterAll(async () => {
      await page.close();
    });
    test('Navigate to MyTrips Travelers Page and verify expected elements are displayed', async ()=>{
        const loginText = [
            'Enter your email address to get started with myTrips. If you have not registered with us yet, we will guide you through the process.'
          ];
        // expect(page).toHaveURL("https://qamytrips.vialto.com/Account/Login");
        //  const isVisible = await page.locator(loginPageJson.toolbars.loginHeader).isVisible();
        const isLoginHeaderVisible = await basepage.isElementPresent(loginPageJson.toolbars.loginHeader);
        expect(isLoginHeaderVisible).toBe(true);
        const text = await page.locator(loginPageJson.mainPage.loginHelpText).allInnerTexts();
        expect(text).toEqual(loginText);
         const isLoginBoxVisible = await basepage.isElementPresent(loginPageJson.inputBoxes.email);
         expect(isLoginBoxVisible).toBe(true);
        const isGetSTartedBtnVisible = await page.locator(loginPageJson.buttons.getStartedSigninBtn).isVisible();
        expect(isGetSTartedBtnVisible).toBe(true);
        const isGetSTartedBtnSelectable = await page.locator(loginPageJson.buttons.getStartedSigninBtn).isEnabled()
        expect(isGetSTartedBtnSelectable).toBe(true);
        const buttonText = await page.locator(loginPageJson.buttons.getStartedSigninBtn).textContent();
        expect(buttonText).toBe("Get started");

    });

    test("Login into MyTrips application with Traveler account", async ()=>{
        expect(page).toHaveURL("https://qamytrips.vialto.com/Account/Login");
        await page.locator(loginPageJson.inputBoxes.email).fill("traveler1@mytripqa.com");
        await page.locator(loginPageJson.buttons.getStartedSigninBtn).click();
        await page.waitForSelector(loginPageJson.inputBoxes.password, { waitFor: 'visible', timeout: 60000 });
        const isPasswordBoxVisible = await page.locator(loginPageJson.inputBoxes.password).isVisible();
        expect(isPasswordBoxVisible).toBe(true);
        const isGetSTartedBtnVisible = await page.locator(loginPageJson.buttons.getStartedSigninBtn).isVisible();
        expect(isGetSTartedBtnVisible).toBe(true);
        const isGetSTartedBtnSelectable = await page.locator(loginPageJson.buttons.getStartedSigninBtn).isEnabled()
        expect(isGetSTartedBtnSelectable).toBe(true);
        const buttonText = await page.locator(loginPageJson.buttons.getStartedSigninBtn).textContent();
        expect(buttonText).toBe("Sign in");
        await page.locator(loginPageJson.inputBoxes.password).fill("Test@1234");
        await page.locator(loginPageJson.buttons.getStartedSigninBtn).click();
        await page.waitForSelector("#confirmHomeForm", { waitFor: 'visible', timeout: 60000 });
    });

    test("Verify vialto logo, mytrips logo, Travel Overview, Trip History, Account Settings, Support and Sign Out are displayed in Navpane", async()=>{
      const vialtoLogo = await page.locator('.vialto-logo').isVisible();
        expect(vialtoLogo).toBe(true);
        const myTripsLogo = await page.locator('.mytrips-logo').isVisible();
        expect(myTripsLogo).toBe(true);
        const isTravelOverviewVisible = await page.getByRole('link', { name: 'Travel Overview' }).isVisible();
        expect(isTravelOverviewVisible).toBe(true);
        const isTripHistoryVisible = await page.getByRole('link', { name: 'Trip History'}).isVisible();
        expect(isTripHistoryVisible).toBe(true);
        const accountSettings = await page.getByRole('link', { name: 'Account Settings'}).isVisible();
        expect(accountSettings).toBe(true);
        const signOut = await page.locator('#btnSignOut').isVisible();
        expect(signOut).toBe(true);

    });

    test("Schcedule a trip from ", async()=>{
      // await page.locator("#btnAddNewCalendarTrip").click();
      // await page.locator("#select2-Trip_TripSegments_0__DepartureLocationId-container").click();
      // await page.locator(".select2-dropdown--below input").fill("India");
      // await page.locator("#select2-Trip_TripSegments_0__DepartureLocationId-results li").nth(0).click();

      // await page.locator("#select2-Trip_TripSegments_0__ArrivalLocationId-container").click();
      // await page.locator(".select2-dropdown--below input").fill("India");
      // await page.locator("#select2-Trip_TripSegments_0__DepartureLocationId-results li").nth(0).click();
      // await page.getByRole('textbox', { name: 'India' }).click();
      // await page.getByRole('searchbox').click();
      // await page.getByRole('searchbox').fill('ital');
      // await page.getByRole('option', { name: 'Italy' }).click();
      // await page.getByRole('textbox', { name: '---Please Select---' }).click();
      // await page.getByRole('searchbox').click();
      // await page.getByRole('searchbox').fill('france');
      // await page.getByRole('option', { name: 'France' }).click();
      // await page.getByRole('button', { name: 'Assess my trip from Italy to France' }).click();
      // await page.locator('#Trip_TripSegments_0__DepartureDate').click();
      // await page.getByRole('cell', { name: ' Next Month' }).click();
      // await page.getByRole('row', { name: '1 2 3 4 5 6 7' }).getByRole('cell', { name: '1' }).click();
      // await page.getByRole('cell', { name: '' }).locator('a').click();
      // await page.locator('#Trip_TripSegments_0__ArrivalDate').click();
      // await page.getByRole('row', { name: '1 2 3 4 5 6 7' }).getByRole('cell', { name: '2' }).click();
      // await page.getByRole('cell', { name: '' }).locator('a').click();
      // await page.locator('#Trip_TripSegments_1__DepartureDate').click();
      // await page.getByRole('row', { name: '1 2 3 4 5 6 7' }).getByRole('cell', { name: '7' }).click();
      // await page.getByRole('cell', { name: '' }).locator('a').click();
      // await page.locator('#Trip_TripSegments_1__ArrivalDate').click();
      // await page.getByRole('row', { name: '8 9 10 11 12 13 14' }).getByRole('cell', { name: '8' }).click();
      // await page.getByRole('cell', { name: '' }).locator('a').click();
      // await page.getByRole('button', { name: 'Save and Continue' }).click();
    })

});