import { test } from "@playwright/test";
import { ApiHelper } from "../../../../helpers/api-helpers";
import { MFileApiHelpers } from "../../../../helpers/mfile-api-helpers";
import Params from "../../../../../resources/params.json";
import OR from "../../../../../resources/OR.json";
import path from "path";
import Payload from "../../../../../resources/payloads/athena_StoreDocuments.json"

const urlSuffix = process.env.athenaBaseUrl + OR.AthenaAPI.StoreDocument;
const url = urlSuffix + Params.MFileParams.StoreDocument_Put.CorrectDocumentID;
const relativePathToFile = "./../../../../../resources/updatedtestfile.docx";
const header = null
const filePath = path.resolve(__dirname, relativePathToFile);

let _actualResponse : any

test.describe("Athena API Tests - Put Operation - Store Document.", function () {
    test.describe.configure({ mode: 'parallel' });

    //Pass correct payload and document ID
    test("Verify Athena-\"Put-Store Document\" API with status code as 200.",async () => {
        let payload = Payload.StoreDocuments.CorrectPayloadToUpdate;
        _actualResponse = await MFileApiHelpers.put_Athena_StoreDocuments(filePath, url, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 200, "OK")
    })

    //Pass correct payload and incorrect document ID
    test("Verify Athena-\"Put-Store Document\" API with status code as 400.",async () => {
        let incorrectUrl = urlSuffix + Params.MFileParams.StoreDocument_Put.IncorrectDocumentID
        let payload = Payload.StoreDocuments.CorrectPayloadToUpdate;
        _actualResponse = await MFileApiHelpers.put_Athena_StoreDocuments(filePath, incorrectUrl, header, payload)
        MFileApiHelpers.athena_VerifyResponse(_actualResponse, 400, "Bad Request", "Document ID country code did not match vault guid")
    })

    //Pass incorrect client payload
    // test("Verify Athena-\"Post-StoreDocument\" API with status code as 500 when incorrect client payload is passed.",async () => {
    //     let payload = Payload.StoreDocuments.IncorrectClient;
    //     _actualResponse = await MFileApiHelpers.put_Athena_StoreDocuments(filePath, url, header, payload)
    //     MFileApiHelpers.athena_VerifyResponse(_actualResponse, 500, "Internal Server Error", "", "Put");
    // })
})