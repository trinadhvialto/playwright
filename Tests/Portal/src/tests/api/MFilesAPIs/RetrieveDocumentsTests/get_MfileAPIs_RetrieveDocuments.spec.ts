import { expect, test } from "@playwright/test";
import { JsonUtils } from "../../../../utils/json_utils";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import OR from "../../../../../resources/OR.json";
import Params from "../../../../../resources/params.json"
import responses from "../../../../../resources/response.json"

const url = process.env.mfileApiBaseUrl + OR.MFilesAPI.RetrieveDocuments

let _retrieveDocumentsParams : any
let _actualResponse : any
let _expectedJson : any

//Retrieve Documents API Testing
test.describe("MFiles API Tests - Retrieve Documents", function () {
    test.describe.configure({ mode: 'parallel' });
    
    //Pass correct params
    test("Retrieve Document API with correct params passed",async ({request}) => {
        _retrieveDocumentsParams = Params.MFileParams.RetrieveDocuments.CorrectParams;
        _expectedJson = responses.MFileResponses.RetrieveDocuments.CorrectParams;
        _actualResponse = await MFileApiHelpers.retrieveDocuments_Get(request, url, _retrieveDocumentsParams);

        let _actualJson = await _actualResponse.json();
        
        expect.soft(_actualResponse.ok(), "Verify response received from API call to be true.").toBeTruthy();
        expect.soft(_actualResponse.status(),"Verify response status to be 200").toBe(200);
        expect.soft(JsonUtils.areJsonFilesEqual(_actualJson, _expectedJson), "Get Response for MFile Retrieve Document API is working as expected.").toBeTruthy();
    })

    //Pass Incorrect client param
    test("Retrieve Document API with Incorrect client param passed",async ({request}) => {
        let incorrectClientParam = Params.MFileParams.RetrieveDocuments.IncorrectClientID;
        _actualResponse = await MFileApiHelpers.retrieveDocuments_Get(request, url, incorrectClientParam);
        _expectedJson = responses.MFileResponses.RetrieveDocuments.IncorrectClientID;
        await MFileApiHelpers.retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(_actualResponse, _expectedJson);
    })

    //Pass Incorrect engagement param
    test("Retrieve Document API with Incorrect engagement param passed",async ({request}) => {
        let incorrectEngagementParam = Params.MFileParams.RetrieveDocuments.IncorrectEngagement;
        _actualResponse = await MFileApiHelpers.retrieveDocuments_Get(request, url, incorrectEngagementParam);
        _expectedJson = responses.MFileResponses.RetrieveDocuments.IncorrectEngagement;
        await MFileApiHelpers.retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(_actualResponse, _expectedJson);
    })

    //Pass incorrect Assignee
    test("Retrieve Document API with Incorrect assignee param passed",async ({request}) => {
        let incorrectWorkRecordParam = Params.MFileParams.RetrieveDocuments.IncorrectAssignee;
        _actualResponse = await MFileApiHelpers.retrieveDocuments_Get(request, url, incorrectWorkRecordParam);
        _expectedJson = responses.MFileResponses.RetrieveDocuments.IncorrectAssignee;
        await MFileApiHelpers.retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(_actualResponse, _expectedJson);
    })

    //Pass Incorrect work record param
    test("Retrieve Document API with Incorrect work record param passed",async ({request}) => {
        let incorrectWorkRecordParam = Params.MFileParams.RetrieveDocuments.IncorrectWorkRecord;
        _actualResponse = await MFileApiHelpers.retrieveDocuments_Get(request, url, incorrectWorkRecordParam);
        _expectedJson = responses.MFileResponses.RetrieveDocuments.IncorrectWorkRecord;
        await MFileApiHelpers.retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(_actualResponse, _expectedJson);
    })

    //Pass bad request params
    test("Retrieve Document API with bad request params passed",async ({request}) => {
        let _badRequestParams = Params.MFileParams.RetrieveDocuments.BadRequest;
        _actualResponse = await MFileApiHelpers.retrieveDocuments_Get(request, url, _badRequestParams);
        expect.soft(_actualResponse.ok(), "Verify response received from API call to be false.").toBeFalsy();
        expect.soft(_actualResponse.status(),"Verify response status to be 500").toBe(400);
    })
})
