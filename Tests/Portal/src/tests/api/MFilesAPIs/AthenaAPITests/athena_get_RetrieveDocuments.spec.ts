import { expect, test } from "@playwright/test";
import { JsonUtils } from "../../../../utils/json_utils";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import OR from "../../../../../resources/OR.json";
import Params from "../../../../../resources/params.json"
import responses from "../../../../../resources/response.json"

const url = process.env.athenaBaseUrl + OR.AthenaAPI.RetrieveDocument

let _retrieveDocumentsParams : any
let _actualResponse : any
let _expectedJson : any

//Retrieve Documents API Testing
test.describe("Athena API Tests - Retrieve Documents", function () {
    test.describe.configure({ mode: 'parallel' });
    
    //Pass correct params
    test("Verify Athena-\"Get-RetrieveDocument\" API with status code as 200 when correct params are passed.",async ({request}) => {
        _retrieveDocumentsParams = Params.MFileParams.RetrieveDocuments.CorrectParams;
        _expectedJson = responses.AthenaResponses.RetrieveDocuments.CorrectParams;
        _actualResponse = await MFileApiHelpers.get_Athena_RetrieveDocuments(request, url, _retrieveDocumentsParams);

        let _actualJson = await _actualResponse.json();
        
        expect.soft(_actualResponse.ok(), "Verify response received from API call to be \"OK\".").toBeTruthy();
        expect.soft(_actualResponse.status(),"Verify response status to be 200").toBe(200);
        expect.soft(JsonUtils.areJsonFilesEqual(_actualJson, _expectedJson), "Get Response for Athena Retrieve Document API is working as expected.").toBeTruthy();
    })

    //Pass Incorrect client param
    test("Verify Athena-\"Get-RetrieveDocument\" API with status code as 500 when incorrect client param is passed.",async ({request}) => {
        let incorrectClientParam = Params.MFileParams.RetrieveDocuments.IncorrectClientID;
        _actualResponse = await MFileApiHelpers.get_Athena_RetrieveDocuments(request, url, incorrectClientParam);
        _expectedJson = responses.AthenaResponses.RetrieveDocuments.IncorrectClientID;
        await MFileApiHelpers.retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(_actualResponse, _expectedJson);
    })

    //Pass Incorrect engagement param
    test("Verify Athena-\"Get-RetrieveDocument\" API with status code as 500 when incorrect engagement param is passed.",async ({request}) => {
        let incorrectEngagementParam = Params.MFileParams.RetrieveDocuments.IncorrectEngagement;
        _actualResponse = await MFileApiHelpers.get_Athena_RetrieveDocuments(request, url, incorrectEngagementParam);
        _expectedJson = responses.AthenaResponses.RetrieveDocuments.IncorrectEngagement;
        await MFileApiHelpers.retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(_actualResponse, _expectedJson);
    })

    //Pass incorrect Assignee
    test("Verify Athena-\"Get-RetrieveDocument\" API with status code as 500 when incorrect assignee param is passed.",async ({request}) => {
        let incorrectWorkRecordParam = Params.MFileParams.RetrieveDocuments.IncorrectAssignee;
        _actualResponse = await MFileApiHelpers.get_Athena_RetrieveDocuments(request, url, incorrectWorkRecordParam);
        _expectedJson = responses.AthenaResponses.RetrieveDocuments.IncorrectAssignee;
        await MFileApiHelpers.retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(_actualResponse, _expectedJson);
    })

    //Pass Incorrect work record param
    test("Verify Athena-\"Get-RetrieveDocument\" API with status code as 500 when incorrect work record param is passed.",async ({request}) => {
        let incorrectWorkRecordParam = Params.MFileParams.RetrieveDocuments.IncorrectWorkRecord;
        _actualResponse = await MFileApiHelpers.get_Athena_RetrieveDocuments(request, url, incorrectWorkRecordParam);
        _expectedJson = responses.AthenaResponses.RetrieveDocuments.IncorrectWorkRecord;
        await MFileApiHelpers.retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(_actualResponse, _expectedJson);
    })

    //Pass bad request params
    test("Verify Athena-\"Get-RetrieveDocument\" API with status code as 400 when incorrect  paramater keys are passed.",async ({request}) => {
        let _badRequestParams = Params.MFileParams.RetrieveDocuments.BadRequest;
        _actualResponse = await MFileApiHelpers.get_Athena_RetrieveDocuments(request, url, _badRequestParams);
        expect.soft(_actualResponse.ok(), "Verify response received from API call to be false.").toBeFalsy();
        expect.soft(_actualResponse.status(),"Verify response status to be 500").toBe(400);
    })
})
