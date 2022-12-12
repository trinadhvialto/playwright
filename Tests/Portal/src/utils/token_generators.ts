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

    static async generateSasToken(resourceUri: string | number | boolean, signingKey: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }, policyName: string, expiresInMins: number) {
        resourceUri = encodeURIComponent(resourceUri);

        // Set expiration in seconds
        var expires = (Date.now() / 1000) + expiresInMins * 60;
        expires = Math.ceil(expires);
        var toSign = resourceUri + '\n' + expires;

        // Use crypto
        var hmac = crypto.createHmac('sha256', Buffer.from(signingKey, 'base64'));
        hmac.update(toSign);
        var base64UriEncoded = encodeURIComponent(hmac.digest('base64'));

        // Construct authorization string
        var token = "SharedAccessSignature sr=" + resourceUri + "&sig=" + base64UriEncoded + "&se=" + expires;
        if (policyName) token += "&skn=" + policyName;
        return token;
    };

    static async generateAuthToken(userType: string) {

        var hostName = 'id-ip-stage.zeiss.com';
        var username, password;
        if (userType.toLowerCase() == "regularuser") {
            username = process.env.regularuser
            password = process.env.regularuserpassword
        } else if (userType.toLowerCase() == "l1serviceuser") {
            username = process.env.username
            password = process.env.password
        } else if (userType.toLowerCase() == "cmprovuser1") {
            username = process.env.cmprovuser1
            password = process.env.cmprovpassword
        } else if (userType.toLowerCase() == "cmprovuserl1") {
            username = process.env.cmprovuserl1
            password = process.env.cmprovpasswordl1
        }

        var config = {
            method: 'POST',
            url: 'https://' + hostName + '/OAuth/oauth2/v2.0/token?p=B2C_1A_ZeissIdRopcSignIn',
            data: qs.stringify({
                'username': username,
                'password': password,
                'grant_type': 'password',
                'scope': 'openid 3782c700-0a83-4eb8-82c4-73f604470de4',
                'client_id': '3782c700-0a83-4eb8-82c4-73f604470de4',
                'response_type': 'id_token',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }

        var tokenresponse = await this.request(config);

        return tokenresponse.data.id_token
    }

    static async generateKeyVaultAccessToken(keyvault: any) {
        var config = {
            method: 'POST',
            url: `https://login.microsoftonline.com/${process.env.tenantId}/oauth2/v2.0/token`,
            data: qs.stringify({
                'scope': 'https://vault.azure.net/.default',
                'grant_type': 'client_credentials',
                'client_id': process.env.servicePrincipalClientId,
                'client_secret': process.env.servicePrincipalClientSecret
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }

        var tokenresponse = await this.request(config);
        return tokenresponse.data.access_token
    }

}