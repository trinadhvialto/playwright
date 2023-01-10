import { test, expect } from "@playwright/test";
import { ApiHelper } from "../../../../helpers/api-helpers";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import { JsonUtils } from "../../../../utils/json_utils";
import OR from "../../../../../resources/OR.json";
import Params from "../../../../../resources/params.json"
import responses from "../../../../../resources/response.json"
import Payload from "../../../../../resources/payloads/athena_StoreDocuments.json"
import path from "path";

const header = null;

let _actualResponse : any
let url : string
let _retrieveDocumentsParams : any
let _expectedJson : any
let _documentIDGenerated : any
let _actualJson : any

test.describe("Athena API Tests - End to End test", function () {
    test.describe.configure({ mode: 'serial' });

    //Test to check if server is up
    test("Verify the server is up and running - Verify Athena-\"Get-Test\" API with status code as 200",async () => {
        url = process.env.athenaBaseUrl + OR.AthenaAPI.Test;
        _actualResponse = await ApiHelper.get(url, header);
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK", "test")
    })

    //Retrieve document structure
    test("Retrieve document structure - Verify Athena-\"Get-RetrieveDocument\" API with status code as 200.",async ({request}) => {
        url = process.env.athenaBaseUrl + OR.AthenaAPI.RetrieveStructure;
        _actualResponse = await ApiHelper.get(url, header);
        _expectedJson = responses.AthenaResponses.RetrieveStructure;
        _actualJson = _actualResponse.data;
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK")
        expect.soft(JsonUtils.areJsonFilesEqual(_actualJson, _expectedJson), "Get Response for Athena Retrieve Structure API is working as expected.").toBeTruthy();
    })

    //Upload document
    test("Upload document - Verify Athena-\"Post-StoreDocument\" API with status code as 200.",async () => {
        let payload = Payload.StoreDocuments.CorrectPayload;
        let relativePathToFile = "./../../../../../resources/testfile.docx";
        let filePath = path.resolve(__dirname, relativePathToFile)
        url = process.env.athenaBaseUrl + OR.AthenaAPI.StoreDocument
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK");
        _documentIDGenerated = MFileApiHelpers.athena_StoreDocuments_GetNewlyCreatedDocumentID(_actualResponse);
    })

    //Retrieve documents
    test("Retrieve documents - Verify Athena-\"Get-RetrieveDocument\" API with status code as 200.",async ({request}) => {
        _retrieveDocumentsParams = Params.MFileParams.RetrieveDocuments.CorrectParamsForEndToEndTest;
        url = process.env.athenaBaseUrl + OR.AthenaAPI.RetrieveDocument
        _actualResponse = await MFileApiHelpers.get_Athena_RetrieveDocuments(request, url, _retrieveDocumentsParams);       
        expect.soft(_actualResponse.ok(), "Verify response received from API call to be \"OK\".").toBeTruthy();
        expect.soft(_actualResponse.status(),"Verify response status to be 200").toBe(200);
    })

    //Get document with document ID
    test("Get document with document ID: " + _documentIDGenerated + " - Verify Athena-\"Get-GetDocument\" API with status code as 200.",async () => {
        let urlSuffix = process.env.athenaBaseUrl + OR.AthenaAPI.GetDocument;
        let url = urlSuffix + "/" + _documentIDGenerated;
        _actualResponse = await ApiHelper.get(url, header)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK")
    })

    //Get documents with {"<DocumentID>"}
    test("Get document with document ID: {\"" + _documentIDGenerated + "\"} - Verify Athena-\"Get-GetDocuments\" API with status code as 200.",async () => {
        url = process.env.athenaBaseUrl + OR.AthenaAPI.GetDocuments
        _retrieveDocumentsParams = Params.MFileParams.GetDocuments.CorrectParams;
        _actualResponse = await ApiHelper.get(url, header, _retrieveDocumentsParams)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK")
    })

    //Update document with "<Document ID>"
    test("Update document with document ID: " + _documentIDGenerated + " - Verify Athena-\"Put-Store Document\" API with status code as 200.",async () => {
        let payload = Payload.StoreDocuments.CorrectPayloadToUpdate;
        let relativePathToFile = "./../../../../../resources/updatedtestfile.docx";
        let filePath = path.resolve(__dirname, relativePathToFile);
        let urlSuffix = process.env.athenaBaseUrl + OR.AthenaAPI.StoreDocument;
        let url = urlSuffix + Params.MFileParams.StoreDocument_Put.CorrectDocumentID;
        _actualResponse = await MFileApiHelpers.put_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK")
    })
})