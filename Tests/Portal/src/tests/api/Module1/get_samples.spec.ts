
import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../../helpers/api-helpers'
var OR = require("../../../../resources/OR.json");
const { request } = require('http');

let response : any;

test.describe("Viewing Activation Key in WebUI", function () {
  test.beforeAll(async function () {
   
  });

  test("API-sample API test @api", async function ({ request }) {
    
    let url = OR.APIUrls.sample_Get;

    let header ='';

     response=  await ApiHelper.get(url,header);

    await test.step(
      `Verify the fields `,
      async () => {
        expect(response.status).toBe(200)

      }
    );






  });

  test("API-sample API test2 @api2", async function ({ page }) {
    


    let url = OR.APIUrls.sample_Get;

    let header ='';

    var response=  await ApiHelper.get(url,header);

    expect(response.status).toBe(200)


  });


});