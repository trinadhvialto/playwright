import { test } from "@playwright/test";
import path from "path";
import OR from "../../../../../resources/OR.json";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import Payload from "../../../../../resources/payloads/athena_StoreDocuments.json"


const url = process.env.athenaBaseUrl + OR.AthenaAPI.StoreDocument
const relativePathToFile = "./../../../../../resources/testfile.docx";
const filePath = path.resolve(__dirname, relativePathToFile);
const header = null;
let _actualResponse : any;

test.describe("Athena API Tests - Post Operation - Store Document", function () {
    test.describe.configure({ mode: 'parallel' });

    //Pass correct payload
    test("Verify Athena-\"Post-StoreDocument\" API with status code as 200 when correct payload is passed.",async () => {
        let payload = Payload.StoreDocuments.CorrectPayload;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK");
        MFileApiHelpers.athena_StoreDocuments_GetNewlyCreatedDocumentID(_actualResponse);
    })

    //Pass incorrect client payload
    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect client payload is passed.",async () => {
        let payload = Payload.StoreDocuments.IncorrectClient;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 500, "Internal Server Error", "An error has occurred.", "Post");
    })

    //Pass incorrect engagement payload
    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect engagment payload is passed.",async () => {
        let payload = Payload.StoreDocuments.IncorrectEngagement;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 500, "Internal Server Error", "An error has occurred.", "Post");
    })

    //Pass incorrect assignee payload
    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect assignee payload is passed.",async () => {
        let payload = Payload.StoreDocuments.IncorrectAssignee;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 500, "Internal Server Error", "An error has occurred.", "Post");
    })

    //Pass incorrect work record payload
    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect work record payload is passed.",async () => {
        let payload = Payload.StoreDocuments.IncorrectWorkrecord;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 500, "Internal Server Error", "An error has occurred.", "Post");
    })

    //Pass incorrect class identifier payload
    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect class identifier payload is passed.",async () => {
        let payload = Payload.StoreDocuments.IncorrectClassIdentifier;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 500, "Internal Server Error", "An error has occurred.", "Post");
    })

    //Pass incorrect practice type payload
    test("Verify Athena-\"Post-StoreDocument\" API with status code as 400 when incorrect practice type payload is passed.",async () => {
        let payload = Payload.StoreDocuments.IncorrectPracticeType;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 400, "Bad Request", "Vault ({EB9D0087-37E2-4268-80B2-5CCF3A121E78}) did not have a Practice Type matching 'Taxes'");
    })

    //Pass incorrect year payload
    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect year payload is passed.",async () => {
        let payload = Payload.StoreDocuments.IncorrectYear;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 500, "Internal Server Error", "An error has occurred.", "Post");
    })

    //Pass incorrect tax document  payload
    test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect tax document type payload is passed.",async () => {
        let payload = Payload.StoreDocuments.IncorrectTaxDocumentType;
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 500, "Internal Server Error", "An error has occurred.", "Post");
    })

    //Pass incorrect country payload
    test("Verify Athena-\"Post-StoreDocument\" API with status code as 400 when incorrect country payload is passed.",async () => {
        let payload = Payload.StoreDocuments.IncorrectCountry
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 400, "Bad Request", "Failed to get vault for country 'JP'");
    })

    //This test fails on purpose
    test("Dummy test to fail",async () => {
        let payload = Payload.StoreDocuments.IncorrectCountry
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 500, "Test fail", "Post");
    })

    // This test is not run
    test.skip('Dummy test to skip', async () => {
        let payload = Payload.StoreDocuments.IncorrectCountry
        _actualResponse = await MFileApiHelpers.post_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 500, "Test fail", "Post");
    });
})