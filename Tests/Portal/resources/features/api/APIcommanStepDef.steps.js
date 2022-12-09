const { test, expect } = require("@playwright/test");
const { ApiHelper } = require("../../../src/helpers/api-helpers.js");
var OR = require("../../OR.json");
var OR_Header = require("../../headers.json");
var OR_payload = require("../../payloads.json");
const {Comparisions }= require("..//../../src/utils/comparisions.js");


const { Given, When, Then } = require("@cucumber/cucumber");

const { request } = require("http");

var response;



Given(
  "trigger api with method {string},{string},{string} and {string}",
  async function (method, endPoint, header, payload) {
    // Write code here that turns the phrase above into concrete actions
    let url = OR.APIUrls[endPoint];

    let aheader = OR_Header[header];

    let body = OR_payload.payloads[payload];

    //  let data = payload;
    if (method.toLowerCase() == "get") {
      response = await ApiHelper.get(url, aheader);
    } else if (method.toLowerCase() == "post") {
      response = await ApiHelper.post(url, aheader, body);
    }
  }
);

When(
  "user execute create service {string} and {string}",
  function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Then(
  "api should be successful {string} and {string}",
  async function (string, string2) {
    expect(response.status).toBe(parseInt(string2));

    if (string.includes("COMPARE")) {

      const areEqual=[];
      var json = require("../../" + string.replace('COMPARE_','')); //(with path)
      areEqual.push(await Comparisions.compareUnorderedJSONObjects(json,response.data));
      expect(areEqual).not.toContain(false);

    } else {
      expect.soft(response).toHaveText(string);
    }
  }
);
