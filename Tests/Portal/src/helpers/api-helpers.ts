import { TokenGenerators } from '../utils/token_generators';

export class ApiHelper {

    static async post(url: any, header: any, payload: any) {
        var config = {
            method: 'post',
            url: url,
            headers: header,
            body: payload
        };

        var response = await TokenGenerators.request(config);
        return response;
    }

    static async get(url: any, header: any) {
        var config = {
            method: 'GET',
            url: url,
            headers: header
        };

        var response = await TokenGenerators.request(config);
        return response;
    }

    static async put(url: any, header: any, payload: any) {
        var config = {
            method: 'put',
            url: url,
            headers: header,
            body: payload
        };

        var response = await TokenGenerators.request(config);
        return response;
    }

}