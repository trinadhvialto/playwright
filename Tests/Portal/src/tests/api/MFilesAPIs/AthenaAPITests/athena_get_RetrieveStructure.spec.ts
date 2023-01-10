import { test, expect } from "@playwright/test";
import { ApiHelper } from "../../../../helpers/api-helpers";
import { JsonUtils } from "../../../../utils/json_utils";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import OR from "../../../../../resources/OR.json";
import responses from "../../../../../resources/response.json"

const url = process.env.athenaBaseUrl + OR.AthenaAPI.RetrieveStructure;
const header = ""

let _actualResponse : any
let _expectedJson : any
let _actualJson : any

test.describe("Athena API Tests - Retrieve Structure.", function () {
    test.describe.configure({ mode: 'parallel' });

    //Test to check if server is up
    test("Verify Athena-\"Get-Retrieve Structure\" API with status code as 200.",async () => {
        _actualResponse = await ApiHelper.get(url, header);
        _expectedJson = responses.AthenaResponses.RetrieveStructure;
        _actualJson = _actualResponse.data;
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK")
        expect.soft(JsonUtils.areJsonFilesEqual(_actualJson, _expectedJson), "Get Response for Athena Retrieve Structure API is working as expected.").toBeTruthy();
    })
})