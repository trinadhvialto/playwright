import { test } from "@playwright/test";
import { ApiHelper } from "../../../../helpers/api-helpers";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import OR from "../../../../../resources/OR.json";
import Params from "../../../../../resources/params.json"

const url = process.env.athenaBaseUrl + OR.AthenaAPI.GetDocuments
const header = ""

let _retrieveDocumentsParams : any
let _actualResponse : any

test.describe("Athena API Tests - Get Documents - Parameter is an String array of document IDs", function() {
    test.describe.configure({ mode: 'parallel' });

    //Pass correct params
    test("Verify Athena-\"Get-GetDocuments\" API with status code as 200 when correct params are passed.",async () => {
        _retrieveDocumentsParams = Params.MFileParams.GetDocuments.CorrectParams;
        _actualResponse = await ApiHelper.get(url, header, _retrieveDocumentsParams)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK")
    })

    //Pass incorrect params
    test("Verify Athena-\"Get-GetDocuments\" API with status code as 400 when incorrect params are passed.",async () => {
        _retrieveDocumentsParams = Params.MFileParams.GetDocuments.IncorrectParams;
        _actualResponse = await ApiHelper.get(url, header, _retrieveDocumentsParams)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 400, "Bad Request", "Document ID country code did not match vault guid")
    })

    //Pass incorrect url
    test("Verify Athena-\"Get-GetDocuments\" API with status code as 404 when incorrect url  passed.",async () => {
        _retrieveDocumentsParams = Params.MFileParams.GetDocuments.IncorrectParams;
        _actualResponse = await ApiHelper.get(url + "/incorrect", header, _retrieveDocumentsParams)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 404, "Not Found")
    })
})