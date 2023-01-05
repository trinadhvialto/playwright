import { expect, test } from "@playwright/test";
import { JsonUtils } from "../../../../utils/json_utils";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import OR from "../../../../../resources/OR.json";
import Params from "../../../../../resources/params.json"
import results from "../../../../../resources/response.json"

const url = process.env.mfileApiBaseUrl + OR.MFilesAPI.RetrieveDocuments

let _response : any
let _json : any
let _jsonBody : any
let _jsonBodySuccess : any
let _jsonBodyFailure : any

//Retrieve Documents API Testing
test.describe("MFiles Retrieve Documents API Tests", function () {
    
    //Pass correct params
    test("Retrieve Document API with correct params passed",async ({request}) => {
        let retrieveDocumentsParams = Params.MFileParams.RetrieveDocuments.CorrectParams;
        let expectedAPIResponse = results.MFileResponses.RetrieveDocuments.CorrectParams;

        _response = await MFileApiHelpers.retrieveDocuments_Get(request, url, retrieveDocumentsParams);

        _json = await _response.json();
        let actualAPIResponse = _json[0];
        
        expect(_response.ok()).toBeTruthy();
        expect(_response.status()).toBe(200);
        expect(JsonUtils.areJsonFilesEqual(_json, expectedAPIResponse), "Get Response for MFile Retrieve Document API is working as expected.").toBeTruthy();
    })

    //Pass Incorrect client param
    test("Retrieve Document API with Incorrect client param passed",async ({request}) => {
        let incorrectClientParam = Params.MFileParams.RetrieveDocuments.IncorrectClientID;
        _response = await MFileApiHelpers.retrieveDocuments_Get(request, url, incorrectClientParam);

        _json = await _response.json();
        _jsonBodySuccess = _json.Success[0];
        _jsonBodyFailure = _json.Failure[0];
        expect(_jsonBodySuccess).toBeUndefined();
        expect(_response.ok()).toBeFalsy();
        expect(_response.status()).toBe(500);
        expect(_jsonBodyFailure.Country).toBe(results.MFileResponses.RetrieveDocuments.IncorrectClientID.Country);
        expect(_jsonBodyFailure.Error).toContain(results.MFileResponses.RetrieveDocuments.IncorrectClientID.Error);
    })

    //Pass Incorrect engagement param
    test("Retrieve Document API with Incorrect engagement param passed",async ({request}) => {
        let incorrectEngagementParam = Params.MFileParams.RetrieveDocuments.IncorrectEngagement;
        _response = await request.get(url, {
            params : incorrectEngagementParam
        });

        _json = await _response.json();
        _jsonBodySuccess = _json.Success[0];
        _jsonBodyFailure = _json.Failure[0];
        expect(_jsonBodySuccess).toBeUndefined();
        expect(_response.ok()).toBeFalsy();
        expect(_response.status()).toBe(500);
        expect(_jsonBodyFailure.Country).toBe(results.MFileResponses.RetrieveDocuments.IncorrectEngagement.Country);
        expect(_jsonBodyFailure.Error).toContain(results.MFileResponses.RetrieveDocuments.IncorrectEngagement.Error);
    })

    //Pass Incorrect work record param
    test("Retrieve Document API with Incorrect work record param passed",async ({request}) => {
        let incorrectWorkRecordParam = Params.MFileParams.RetrieveDocuments.IncorrectEngagement;
        _response = await request.get(url, {
            params : incorrectWorkRecordParam
        });

        _json = await _response.json();
        _jsonBodySuccess = _json.Success[0];
        _jsonBodyFailure = _json.Failure[0];
        expect(_jsonBodySuccess).toBeUndefined();
        expect(_response.ok()).toBeFalsy();
        expect(_response.status()).toBe(500);
        expect(_jsonBodyFailure.Country).toBe(results.MFileResponses.RetrieveDocuments.IncorrectWorkRecord.Country);
        expect(_jsonBodyFailure.Error).toContain(results.MFileResponses.RetrieveDocuments.IncorrectWorkRecord.Error);
    })
})
