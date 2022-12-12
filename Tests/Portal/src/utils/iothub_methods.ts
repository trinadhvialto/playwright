import { TokenGenerators } from './token_generators'
var apiVersion = 'api-version=2020-09-30'
import { TestData } from '../utils/test_data';

export class IotHubMethods{
    
    static async getModuleTwin(iothub: string, deviceId: string, moduleId: string, sastoken: any){
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

    static async getDevicesOnStatus(iothub: string, sastoken: any){ 
        var iothubConfig = {  
            method: 'post',
            url: 'https://'+iothub+'.azure-devices.net/devices/query?api-version=2020-05-31-preview',
            headers: { "Authorization": sastoken },
            data:{"query": "select * from devices"}
        };
        var iothubResponse = await TokenGenerators.request(iothubConfig);
        return iothubResponse;
    }

    static async invokeMethod(iothub: string,deviceId: string,moduleId: string,methodName: any,payload: any,sastoken: any){
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

    static async updateModuleTwinProperties(iothub: string, deviceId: string, moduleId: string, sastoken: any,payload: any){
        var iothubConfig = {  
            method: 'patch',
            url: 'https://'+iothub+'.azure-devices.net/twins/'+deviceId+'/modules/'+moduleId+'?api-version=2020-05-31-preview',
            headers: { "Authorization": sastoken },
            data: {"properties": payload},
            
        };
        var iothubResponse = await TokenGenerators.request(iothubConfig);
        return iothubResponse;
    }

    static async getDeviceTwin(iothub: string, deviceId: string, sastoken: any){
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