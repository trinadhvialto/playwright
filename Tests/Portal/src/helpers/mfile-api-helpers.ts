import { expect } from "@playwright/test";

export class MFileApiHelpers {
    static async retrieveDocuments_Get(request, url, params) {
        return await request.get(url, {
            params : params
        });
    }

    static async retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(_response, _expectedResponse) {
        
        let _actualResponseReceived = await _response.json();
        let _successBody = _actualResponseReceived.Success[0];
        let _failureBody = _actualResponseReceived.Failure[0];

        expect(_successBody, "Verify success body of JSON received from API call to be undefined.").toBeUndefined();
        expect(_response.ok(), "Verify response received from API call to be false.").toBeFalsy();
        expect(_response.status(), "Verify response status to be 500").toBe(500);

        expect(_failureBody.Country, "Verify Country tag in Failure Body to be " + _expectedResponse.Country).toBe(_expectedResponse.Country);
        expect(_failureBody.Error, "Verify Country tag in Failure Body to be " + _expectedResponse.Error).toContain(_expectedResponse.Error);
    }
}