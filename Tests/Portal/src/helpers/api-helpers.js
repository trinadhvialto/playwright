const { TokenGenerators } = require('../../utils/token_generators.js');

exports.ApiHelper = class ApiHelper {

    static async post(url, header, payload) {
        var config = {
            method: 'post',
            url: url,
            headers: header,
            body: payload
        };

        var response = await TokenGenerators.request(config);
        return response;
    }

    static async get(url, header) {
        var config = {
            method: 'GET',
            url: url,
            headers: header
        };

        var response = await TokenGenerators.request(config);
        return response;
    }

    static async put(url, header, payload) {
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