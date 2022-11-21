var _ = require('lodash');
// var underscore = require('underscore');
exports.Comparisions = class Comparisions{
  static async compareObjects(actualObj, expectedObj) {
    var same;
    console.log("Actual Obj: "+actualObj+" and Expected Obj: "+expectedObj)
    same = _.isEqual(actualObj, expectedObj);
    console.log(same);
    return same;
  };

  static async compareUnorderedJSONObjects(actualObj, expectedObj){
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