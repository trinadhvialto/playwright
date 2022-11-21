const { TokenGenerators } = require('./token_generators.js')
var apiVersion = 'api-version=2020-09-30'
const { TestData } = require('../utils/test_data.js');

exports.IotHubMethods = class IotHubMethods{
    
    static async getModuleTwin(iothub, deviceId, moduleId, sastoken){
        var iothubConfig = {  
            method: 'post',
            url: 'https://'+iothub+'.azure-devices.net/devices/query?api-version=2020-05-31-preview',
            headers: { "Authorization": sastoken },
            data: {"query": "select * from devices.modules where devices.deviceId = '"+deviceId+"' and moduleId='"+moduleId+"'"}
        };
        await TestData.waitFortimeOut(12000);
        var iothubResponse = await TokenGenerators.request(iothubConfig);
        return iothubResponse;
    }

    static async getDevicesOnStatus(iothub, sastoken){ 
        var iothubConfig = {  
            method: 'post',
            url: 'https://'+iothub+'.azure-devices.net/devices/query?api-version=2020-05-31-preview',
            headers: { "Authorization": sastoken },
            data:{"query": "select * from devices"}
        };
        var iothubResponse = await TokenGenerators.request(iothubConfig);
        return iothubResponse;
    }

    static async invokeMethod(iothub,deviceId,moduleId,methodName,payload,sastoken){
        console.log(deviceId)
        // console.log('https://'+iothub+'.azure-devices.net/twins/'+deviceId+'/modules/'+moduleId+'/methods?api-version=2020-05-31-preview')
        console.log('https://'+iothub+'.azure-devices.net/twins/'+deviceId+'/modules/'+moduleId+'/methods?'+apiVersion)
        var iothubConfig = {  
            method: 'post',
            // url: 'https://'+iothub+'.azure-devices.net/twins/'+deviceId+'/modules/'+moduleId+'/methods?api-version=2020-05-31-preview',
            url: 'https://'+iothub+'.azure-devices.net/twins/'+deviceId+'/modules/'+moduleId+'/methods?'+apiVersion,
            headers: { "Authorization": sastoken },
            data: {"connectTimeoutInSeconds": 80,
            "methodName": methodName,
            "payload": payload,
            "responseTimeoutInSeconds": 80
        }
        };
        var iothubResponse = await TokenGenerators.request(iothubConfig);
        return iothubResponse;
    }

    static async updateModuleTwinProperties(iothub, deviceId, moduleId, sastoken,payload){
        var iothubConfig = {  
            method: 'patch',
            url: 'https://'+iothub+'.azure-devices.net/twins/'+deviceId+'/modules/'+moduleId+'?api-version=2020-05-31-preview',
            headers: { "Authorization": sastoken },
            data: {"properties": payload},
            
        };
        var iothubResponse = await TokenGenerators.request(iothubConfig);
        return iothubResponse;
    }

    static async getDeviceTwin(iothub, deviceId, sastoken){
        var iothubConfig = {  
            method: 'post',
            url: 'https://'+iothub+'.azure-devices.net/devices/query?api-version=2020-05-31-preview',
            headers: { "Authorization": sastoken },
            data: {"query": "select * from devices where deviceId = '"+deviceId+"'"}
        };
        var iothubResponse = await TokenGenerators.request(iothubConfig);
        return iothubResponse;
    }

}