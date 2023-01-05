export class MFileApiHelpers {
    static async retrieveDocuments_Get(request, url, params) {
        return await request.get(url, {
            params : params
        });
    }

    static retrieveDocuments_IsCorrectAPIResponseReceivedForWrongParamInput(jsonResponseReceived) {
        let _jsonBodySuccess = jsonResponseReceived.Success[0];
        let _jsonBodyFailure = jsonResponseReceived.Failure[0];
    }
}