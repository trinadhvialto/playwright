const { TestData } = require('../../../utils/test_data.js');
const { TokenGenerators } = require('../../../utils/token_generators.js')
const { test, expect } = require('@playwright/test');
const { IotHubMethods } = require('../../../utils/iothub_methods.js');
const { ApiHelper } = require('../../../helpers/api-helpers.js')
var OR = require("../../../resources/OR.json");
var activationKeyHypervDeviceId = process.env.activationKeyHypervDeviceId
const apimActivationKeyRequest = process.env.apimBaseURL + OR.APIUrls.activationKey;
var activationKey, conn,token, customerDetailsId, deviceId, customerId,customerDetailsRecordSet,customer,activationStatus;

test.describe("Viewing Activation Key in WebUI", function () {
  test.beforeAll(async function () {
   
  });

  //US#177412
  test("API-sample API test", async function ({ page }) {
    


    let url = "https://reqres.in/api/users?page=2";

    let header ='';

    var response=  await ApiHelper.get(url,header);

    expect(response.status).toBe(200)


  });



});