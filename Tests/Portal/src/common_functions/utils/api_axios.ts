import crypto from 'crypto'
import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';

export class TokenGenerators {
    static async request(config: AxiosRequestConfig<any>) {
        try {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            var response = await axios(config);
            return response;
        } catch (error) {
            return error.response;
        }

    }


}