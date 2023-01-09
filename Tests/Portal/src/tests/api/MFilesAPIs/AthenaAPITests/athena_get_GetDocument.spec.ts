import { test } from "@playwright/test";
import { ApiHelper } from "../../../../helpers/api-helpers";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import Params from "../../../../../resources/params.json";
import OR from "../../../../../resources/OR.json";

const urlSuffix = process.env.athenaBaseUrl + OR.AthenaAPI.GetDocument;
const header = ""

let url : string
let _actualResponse : any

test.describe("Athena API Tests - Get Documents - Parameter is a string with document ID", function() {
    test.describe.configure({ mode: 'parallel' });

    //Pass correct document ID
    test("Verify Athena-\"Get-GetDocument\" API with status code as 200 when correct document ID is passed.",async ({request}) => {
        let url = urlSuffix + "/" + Params.MFileParams.GetDocument.CorrectDocumentID;
        _actualResponse = await ApiHelper.get(url, header)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK")
    })

    //Pass incorrect document ID
    test("Verify Athena-\"Get-GetDocument\" API with status code as 400 when incorrect document ID is passed.",async ({request}) => {
        let url = urlSuffix + "/" + Params.MFileParams.GetDocument.IncorrectDocumentID;
        _actualResponse = await ApiHelper.get(url, header)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 400, "Bad Request", "Document ID country code did not match vault guid")
    })

    //Pass incorrect url
    test("Verify Athena-\"Get-GetDocument\" API with status code as 404 when incorrect url is passed.",async ({request}) => {
        let url = urlSuffix + "/" + Params.MFileParams.GetDocument.IncorrectDocumentID;
        _actualResponse = await ApiHelper.get(url + "/incorrect", header)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 404, "Not Found")
    })
})