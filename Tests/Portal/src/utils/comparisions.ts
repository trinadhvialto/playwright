import _ from 'lodash';
// var underscore = require('underscore');
export class Comparisions{
  static async compareObjects(actualObj: string, expectedObj: string) {
    var same;
    console.log("Actual Obj: "+actualObj+" and Expected Obj: "+expectedObj)
    same = _.isEqual(actualObj, expectedObj);
    console.log(same);
    return same;
  };

  static async compareUnorderedJSONObjects(actualObj: { [x: string]: any; }, expectedObj: { [x: string]: any; }){
    var Keydata = Object.keys(expectedObj)
    var result = new Array();
    var boolean;
    for (var i = 0; i < Keydata.length; i++){
      if(actualObj[Keydata[i]] == expectedObj[Keydata[i]]){
        result.push(true)
      } else {
        result.push(false)
      }
    }
    boolean = result.includes(false) ? false:true;
    return boolean; 
  }
}