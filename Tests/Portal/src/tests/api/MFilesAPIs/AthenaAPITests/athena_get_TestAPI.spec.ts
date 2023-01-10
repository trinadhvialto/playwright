import { test } from "@playwright/test";
import { ApiHelper } from "../../../../helpers/api-helpers";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import OR from "../../../../../resources/OR.json";

const url = process.env.athenaBaseUrl + OR.AthenaAPI.Test;
const header = ""

let _actualResponse : any

test.describe("Athena API Tests - Test - Checks if server is up", function () {
    test.describe.configure({ mode: 'parallel' });

    //Test to check if server is up
    test("Verify Athena-\"Get-Test\" API with status code as 200 to verify server is up and running.",async () => {
        _actualResponse = await ApiHelper.get(url, header);
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK", "test")
    })
})