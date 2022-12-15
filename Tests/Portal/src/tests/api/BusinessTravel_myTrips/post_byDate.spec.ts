import { test, expect } from "@playwright/test";
import { ApiHelper } from "../../../helpers/api-helpers";
import OR from "../../../../resources/OR.json";
import headerdata from "../../../../resources/headers.json";
import Payloaddata from "../../../../resources/payloads/byDate.json";

let response: any;

test.describe("Business Travel API test for Trips -FetchTripStatus ByDate", function () {
  test.beforeAll(async function () {});

  test(" Postive case for FetchTripStatus ByDate with all parameters in Payload @ByDate @ByDateBT ", async function () {
    let url =
      process.env.apiBaserurl +
      OR.APIUrls.BusinessTravel_API.FetchTripStatus_ByDate;

    let header = headerdata.BydateHeader;

    response = await ApiHelper.post(url, header,Payloaddata);

    expect(response.status).toBe(200);

    expect(response.data[0].FirstName).toContain('sidharth');


  });

  
});
