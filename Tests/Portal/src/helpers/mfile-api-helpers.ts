import { expect } from "@playwright/test";
import { ApiHelper } from "./api-helpers";
import FormData from 'form-data';
import fs from 'fs';

export class MFileApiHelpers {
    static async get_Athena_RetrieveDocuments(request, url, params) {
        return await request.get(url, {
            params : params
        });
    }

    static async post_Athena_StoreDocuments(filePath : string, url : string, header : JSON, payload : any) {
        let data = this.appendFilePathAndDocumentInfo(filePath, payload)
        return await ApiHelper.post(url, header, data)
    }

    static async put_Athena_StoreDocuments(filePath : string, url : string, header : JSON, payload : any) {
        let data = this.appendFilePathAndDocumentInfo(filePath, payload)
        return await ApiHelper.put(url, header, data)
    }

    static appendFilePathAndDocumentInfo(filePath : string, payload : any) {
        let data = new FormData();
        data.append('file', fs.createReadStream(filePath));
        data.append('documentInfo', JSON.stringify(payload.documentInfo));
        return data;
    }

    static async retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(_response, _expectedJson) {
        
        let _actualResponseReceived = await _response.json();
        let _successBody = _actualResponseReceived.Success[0];
        let _failureBody = _actualResponseReceived.Failure[0];

        expect.soft(_successBody, "Verify success body of JSON received from API call to be undefined.").toBeUndefined();
        expect.soft(_response.ok(), "Verify response received from API call to be false.").toBeFalsy();
        expect.soft(_response.status(), "Verify response status to be 500").toBe(500);

        expect.soft(_failureBody.Country, "Verify Country tag in Failure Body to be " + _expectedJson.Country).toBe(_expectedJson.Country);
        expect.soft(_failureBody.Error, "Verify Country tag in Failure Body to be " + _expectedJson.Error).toContain(_expectedJson.Error);
    }

    static athena_StoreDocuments_GetNewlyCreatedDocumentID(_response) {
        let documentID : string = _response.data[0];
        expect(documentID,"Document ID is: " + documentID).not.toBeNull();
        return documentID;
    }

    static athena_VerifyResponse(_response, expectedResponseStatus : number, expectedStausText : string, expectedDataMessage : string = null, apiType : string = "Get") {
        expect.soft(_response.status, "Verify response status to be " + expectedResponseStatus).toBe(expectedResponseStatus);
        expect.soft(_response.statusText, "Verify response received from API call to be \"" + expectedStausText + "\".").toBe(expectedStausText);

        if(Boolean(expectedDataMessage)) {
            switch(apiType) {
                case "Get":
                    expect.soft(_response.data, "Verify message received from API call to be \"" + expectedDataMessage + "\".").toBe(expectedDataMessage);
                    break;
                case "Post":
                    expect.soft(_response.data.Message, "Verify message received from API call to be \"" + expectedDataMessage + "\".").toBe(expectedDataMessage);
                    break;
                case "Put":
                    expect.soft(_response.data, "Verify message received from API call to be \"" + expectedDataMessage + "\".").toBe(expectedDataMessage);
                    break;
                default:
                    break;
            }
        }
    }
}