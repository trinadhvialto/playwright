
const { test, expect } = require('@playwright/test');
const { ApiHelper } = require('../../../helpers/api-helpers.js')
var OR = require("../../../resources/OR.json");
var OR_Header = require("../../../resources/headers.json");

const { request } = require('http');

test.describe("Viewing Activation Key in WebUI", function () {
  test.beforeAll(async function () {
   
  });

  // Given("with all api details {uri},{S1_service_Headers} and {S1_input_Parameters}",async function (uri , S1_service_Headers,S1_input_Parameters) {

  //   let url = OR+"."+uri;

  //   let header =OR_Header+"."+S1_service_Headers;

  //   var response=  await ApiHelper.get(url,header);

  //   expect(response.status).toBe(200)

  //   expect(response.data.name).toBe("name")



  // });



         Given('with all api details {string},{string} and {string}', async function (uri, S1_service_Headers, S1_input_Parameters) {
           // Write code here that turns the phrase above into concrete actions
           let url = OR+"."+uri;

           let header =OR_Header+"."+S1_service_Headers;
       
           var response=  await ApiHelper.get(url,header);
       
           expect(response.status).toBe(200)
       
           expect(response.data.name).toBe("name")    
          
          });



         When('user execute create service {string} and {string}', function (string, string2) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });



         Then('api should be successful {string} and {string}', function (string, string2) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });


});