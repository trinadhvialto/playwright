import { expect } from "@playwright/test";
import { isDeepStrictEqual } from "util";
import _ from 'lodash';

//var underscore = require('underscore');
export class Comparisions {
  static async compareObjects(actualObj: string, expectedObj: string) {
    var same;
    console.log("Actual Obj: " + actualObj + " and Expected Obj: " + expectedObj)
    same = _.isEqual(actualObj, expectedObj);
    console.log(same);
    return same;
  };

  static async compareUnorderedJSONObjects(actualObj: { [x: string]: any; }, expectedObj: { [x: string]: any; }) {
    var Keydata = Object.keys(expectedObj)
    var result = new Array();
    var boolean;
    for (var i = 0; i < Keydata.length; i++) {
      if (actualObj[Keydata[i]] == expectedObj[Keydata[i]]) {
        result.push(true)
      } else {
        result.push(false)
      }
    }
    boolean = result.includes(false) ? false : true;
    return boolean;
  }

  static areJsonFilesEqual(receivedJson, expectedJson): Boolean {
    let isJsonEqual = true;
    let receivedKeys: string[] = this.getJsonKeys(receivedJson);
    let expectedKeys = this.getJsonKeys(expectedJson);
    let receivedValues = this.getJsonValues(receivedJson);
    let expectedValues = this.getJsonValues(expectedJson);
    let count: number = this.getJsonCount(receivedJson);

    for (let i: number = 0; i < count; i++) {
      let receivedKey = receivedKeys[i];
      let expectedKey = expectedKeys[i];
      let receivedValue = receivedValues[i];
      let expectedValue = expectedValues[i];

      let isKeyEmpty: Boolean = receivedKey == (null || "");
      let isKeyEqual: Boolean = receivedKey == expectedKey;
      let isValueEqual: Boolean = isDeepStrictEqual(receivedValue, expectedValue);
      expect.soft(!isKeyEmpty, "Actual Key received is not null.");
      expect.soft(isKeyEqual, "Actual key received is: '" + receivedKey + "' and expected key is: '" + expectedKey + "'.").toBeTruthy();
      expect.soft(isValueEqual, "Actual value received for '" + expectedKey + "' is " + JSON.stringify(receivedValue) + " and \nExpected value is: " + JSON.stringify(expectedValue) + ".").toBeTruthy();

      if (isKeyEmpty || !isKeyEqual || !isValueEqual) {
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