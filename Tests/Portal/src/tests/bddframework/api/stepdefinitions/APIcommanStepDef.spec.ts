
import { Given, Then, When } from '@cucumber/cucumber';
import { test, expect } from '@playwright/test';
const { ApiHelper } = require('../../../../helpers/api-helpers')
var OR = require("../../../../../resources/OR.json");
var OR_Header = require("../../../../../resources/headers.json");

const { request } = require('http');

let response : any;

// test.describe("Viewing Activation Key in WebUI", function () {
//   test.beforeAll(async function () {
   
//   });

//   // Given("with all api details {uri},{S1_service_Headers} and {S1_input_Parameters}",async function (uri , S1_service_Headers,S1_input_Parameters) {

//   //   let url = OR+"."+uri;

//   //   let header =OR_Header+"."+S1_service_Headers;

//   //   var response=  await ApiHelper.get(url,header);

//   //   expect(response.status).toBe(200)

//   //   expect(response.data.name).toBe("name")



//   // });



//          Given('with all api details {string},{string} and {string}', async function (uri: string, S1_service_Headers: string, S1_input_Parameters: any) {
//            // Write code here that turns the phrase above into concrete actions
//            let url = OR+"."+uri;

//            let header =OR_Header+"."+S1_service_Headers;
       
//            var response=  await ApiHelper.get(url,header);
       
//            expect(response.status).toBe(200)
       
//            expect(response.data.name).toBe("name")    
          
//           });



//          When('user execute create service {string} and {string}', function (string: any, string2: any) {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });



//          Then('api should be successful {string} and {string}', function (string: any, string2: any) {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });


// });

Given('User has API details', async function () {
  // Write code here that turns the phrase above into concrete actions
      let url = OR.APIUrls.sample_Get;

      let header ='';

      response=  await ApiHelper.get(url,header); 
  });



When('User executes creative service', async function () {
  let url = OR.APIUrls.sample_Get;

      let header ='';

      response=  await ApiHelper.get(url,header); 
});



Then('API should be successful', async function () {
  let url = OR.APIUrls.sample_Get;

      let header ='';

      response=  await ApiHelper.get(url,header); 
});