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
    test("Verify Athena-\"Get-GetDocuments\" API with status code as 200 when correct params are passed.",async ({request}) => {
        _retrieveDocumentsParams = Params.MFileParams.GetDocuments.CorrectParams;
        _actualResponse = await ApiHelper.get(url, header, _retrieveDocumentsParams)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, "OK", 200)
    })

    //Pass incorrect params
    test("Verify Athena-\"Get-GetDocuments\" API with status code as 400 when incorrect params are passed.",async ({request}) => {
        _retrieveDocumentsParams = Params.MFileParams.GetDocuments.IncorrectParams;
        _actualResponse = await ApiHelper.get(url, header, _retrieveDocumentsParams)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, "Bad Request", 400)
    })

    //Pass incorrect url
    test("Verify Athena-\"Get-GetDocuments\" API with status code as 404 when incorrect url  passed.",async ({request}) => {
        _retrieveDocumentsParams = Params.MFileParams.GetDocuments.IncorrectParams;
        _actualResponse = await ApiHelper.get(url + "/incorrect", header, _retrieveDocumentsParams)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, "Not Found", 404)
    })
})