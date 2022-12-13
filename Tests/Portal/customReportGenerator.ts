var fs = require('fs');
var counter = 0;
var environment = '';
class CustomReportGenerator {
    resultHistory: any[];
    outputFile: string;
    constructor(){
        this.resultHistory = []
        this.outputFile = 'customjson.json'
        counter = 0;   
    }
    
    onBegin(config : any, suite : any) {
      for(let rep of config.reporter){
          if(rep[0].includes('customReportGenerator')){
            this.outputFile = rep[1].outputFile;
            environment = rep[1].environment;              
          }
      }
    }
    
    onTestBegin(test : any) {
    }
  
    onTestEnd(test : any, result : any) {
      this.resultHistory.push(specBuilder(test,result));     

    }
  
    onEnd(result : any) {
      var json = JSON.stringify(this.resultHistory, undefined, '\t');    
      jsonWriter(this.outputFile,json,"TESTS");
    }  
}

function specBuilder(test : any, result : any){
    let tempObj ={
      id: "Spec"+(++counter),
      endTime: null,
      className: 'Unavailable',
      displayName: 'Unavailable',
      startTime:null,
      environment: environment,
      status: 'Unavailable',
      methodName: 'Unavailable',
      labels: []
    }
    
    var userStories = test.title.split('@');
    for(let i=1; i< userStories.length ; i++){
        tempObj.labels.push({
            value: userStories[i].trim(),
            name: 'tag'
        })
    }
    tempObj['className'] = test.parent.title;
    tempObj['methodName'] = test.parent.title + " "+ test.title.split("@")[0].trim();
    tempObj['displayName'] = test.parent.title + " "+ test.title.split("@")[0].trim();
    // Simple binary status check
    tempObj['status'] = result.status == 'passed' ? 'Passed' : 'Failed';
    return tempObj;
}

function jsonWriter(outputFile: string,json: string,prefix: string){ 
  fs.writeFileSync('./testresults/'+prefix+'-'+outputFile+'.json', json, function (err) {
    if (err) {
      console.log('Cannot write JSON\n\t' + err.message);
    }
    else {
      console.log('User Story Report Created Successfully!');
    }
  })
}

module.exports = CustomReportGenerator;