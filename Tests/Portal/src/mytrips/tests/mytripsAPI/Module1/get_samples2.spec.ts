
import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../../../helpers/api-helpers.js'
var OR = require("../../../../resources/OR.json");
const { request } = require('http');

test.describe("Viewing Activation Key in WebUI", function () {
  test.beforeAll(async function () {
   
  });

  test("API-sample API test333 @api", async function ({ request }) {
    
    const newIssue = await request.get(OR.APIUrls.sample_Get);

    console.log(await newIssue.json())

    console.log(await newIssue.json())


    let url = OR.APIUrls.sample_Get;

    let header ='';

    var response=  await ApiHelper.get(url,header);

    expect(response.status).toBe(200)

    expect(response.data.name).toBe("name")



  });

  test("API-sample API test23 @api2", async function ({ page }) {
    


    let url = OR.APIUrls.sample_Get;

    let header ='';

    var response=  await ApiHelper.get(url,header);

    expect(response.status).toBe(200)


  });


});