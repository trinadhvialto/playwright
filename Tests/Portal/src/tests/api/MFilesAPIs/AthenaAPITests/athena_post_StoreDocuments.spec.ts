import { expect, request, test } from "@playwright/test";
import path from "path";
import OR from "../../../../../resources/OR.json";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import Payload from "../../../../../resources/payloads/athena_StoreDocuments.json"
import Response from "../../../../../resources/response.json"


const url = process.env.athenaBaseUrl + OR.AthenaAPI.StoreDocuments
const relativePathToFile = "./../../../../../resources/testupload9.docx";
const filePath = path.resolve(__dirname, relativePathToFile);
const header = null;
let _actualResponse : any;

test.describe("Athena API Tests - Store Documents", function () {
    test.describe.configure({ mode: 'parallel' });

    test("Verify Athena-\"Post-StoreDocument\" API with status code as 200 when correct payload is passed.",async ({request}) => {
        let payload = Payload.StoreDocuments.CorrectPayload;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, true, "OK", 200);
    })

    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect client payload is passed.",async ({request}) => {
        let payload = Payload.StoreDocuments.IncorrectClient;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Internal Server Error", 500);
    })

    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect engagment payload is passed.",async ({request}) => {
        let payload = Payload.StoreDocuments.IncorrectEngagement;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Internal Server Error", 500);
    })

    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect assignee payload is passed.",async ({request}) => {
        let payload = Payload.StoreDocuments.IncorrectAssignee;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Internal Server Error", 500);
    })

    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect work record payload is passed.",async ({request}) => {
        let payload = Payload.StoreDocuments.IncorrectWorkrecord;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Internal Server Error", 500);
    })

    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect class identifier payload is passed.",async ({request}) => {
        let payload = Payload.StoreDocuments.IncorrectClassIdentifier;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Internal Server Error", 500);
    })

    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect practice type payload is passed.",async ({request}) => {
        let payload = Payload.StoreDocuments.IncorrectPracticeType;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Internal Server Error", 500);
    })

    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect year payload is passed.",async ({request}) => {
        let payload = Payload.StoreDocuments.IncorrectYear;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Internal Server Error", 500);
    })

    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect tax document type payload is passed.",async ({request}) => {
        let payload = Payload.StoreDocuments.IncorrectTaxDocumentType;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Internal Server Error", 500);
    })

    test("Verify Athena-\"Post-StoreDocument\" API with status code as 400 when incorrect country payload is passed.",async ({request}) => {
        let payload = Payload.StoreDocuments.IncorrectCountry
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Bad Request", 400);
    })

    test("Dummy test to fail",async ({request}) => {
        //This test fails on purpose
        let payload = Payload.StoreDocuments.IncorrectCountry
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Test fail", 500);
    })

    test.skip('skip this test', async ({ request }) => {
        // This test is not run
        let payload = Payload.StoreDocuments.IncorrectCountry
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_StoreDocuments_VerifyPostResponse(_actualResponse, false, "Test fail", 500);
    });
})