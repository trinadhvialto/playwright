import { expect, request, test } from "@playwright/test";
import path from "path";
import OR from "../../../../../resources/OR.json";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import Payload from "../../../../../resources/payloads/athena_StoreDocuments.json"

//let data = new FormData();
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
        MFileApiHelpers.athena_StoreDocuments_VerifyPostWasSuccessful(_actualResponse);
    })
})