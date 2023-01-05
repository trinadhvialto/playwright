import { expect } from "@playwright/test";
import { isDeepStrictEqual } from "util";

export class JsonUtils {
    //Are Json Files Equal
    static areJsonFilesEqual(receivedJson, expectedJson) : Boolean{
        let isJsonEqual = true;
        let receivedKeys : string[] = this.getJsonKeys(receivedJson);
        let expectedKeys = this.getJsonKeys(expectedJson);
        let receivedValues = this.getJsonValues(receivedJson);
        let expectedValues = this.getJsonValues(expectedJson);
        let count : number = this.getJsonCount(receivedJson);

        for(let i : number = 0; i < count; i++) {
            let receivedKey = receivedKeys[i];
            let expectedKey = expectedKeys[i];
            let receivedValue = receivedValues[i];
            let expectedValue = expectedValues[i];

            let isKeyEmpty : Boolean = receivedKey == (null || "");
            let isKeyEqual : Boolean =  receivedKey == expectedKey;
            let isValueEqual : Boolean = isDeepStrictEqual(receivedValue, expectedValue);
            expect.soft(!isKeyEmpty, "Actual Key received is not null.");
            expect.soft(isKeyEqual, "Actual key received is: '" + receivedKey + "' and expected key is: '" + expectedKey + "'.").toBeTruthy();
            expect.soft(isValueEqual, "Actual value received for '" + expectedKey + "' is " + JSON.stringify(receivedValue) + " and \nExpected value is: " + JSON.stringify(expectedValue) + ".").toBeTruthy();

            if(isKeyEmpty || !isKeyEqual || !isValueEqual) {
                isJsonEqual = false;
            }
        }
        return isJsonEqual;
    }

    //Get Keys from Json Files
    static getJsonKeys(jsonFile) {
        return Object.keys(jsonFile);
    }

    //Get Values From Json Files
    static getJsonValues(jsonFile) {
        return Object.values(jsonFile);
    }
    
    //Get Count of Json items
    static getJsonCount(jsonFile) {
        return Object.keys(jsonFile).length;
    }
}