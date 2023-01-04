import { expect, test } from "@playwright/test";
import OR from "../../../../../resources/OR.json";
import Params from "../../../../../resources/params.json"
import results from "../../../../../resources/response.json"

let _response : any
let _json : any
let _jsonBody : any

//Retrieve Documents API Testing
test.describe("MFiles Retrieve Documents API Tests", function () {
    
    //Pass correct params
    test.only("Retrieve Document API with correct params passed",async ({request}) => {
        let url = process.env.mfileApiBaseUrl + OR.MFilesAPI.RetrieveDocuments
        let retrieveDocumentsParams = Params.MFileParams.RetrieveDocuments.CorrectParams
        _response = await request.get(url, {
            params : retrieveDocumentsParams
        })

        _json = await _response.json();
        _jsonBody = _json[0];
        expect(_response.ok()).toBeTruthy();
        expect(_response.status()).toBe(200);
        expect(_jsonBody.DocumentID).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.DocumentID);
        expect(_jsonBody.Name).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.Name);
        expect(_jsonBody.Client).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.Client);
        expect(_jsonBody.Engagement).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.Engagement);
        expect(_jsonBody.Assignee).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.Assignee);
        expect(_jsonBody.WorkRecord).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.WorkRecord);
        expect(_jsonBody.Class).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.Class);
        expect(_jsonBody.PracticeType).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.PracticeType);
        expect(_jsonBody.Country).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.Country);
        expect(_jsonBody.Year).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.Year);
        expect(_jsonBody.TaxDocumentType).toBe(results.MFileResponses.RetrieveDocuments.GetResponse.TaxDocumentType);
    })

    //Pass incorrect 
})
