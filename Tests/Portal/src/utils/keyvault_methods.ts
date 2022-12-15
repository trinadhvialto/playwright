import { TokenGenerators } from './api_axios'

exports.KeyVaultMethods = class KeyVaultMethods{
    static async getSecrets(secretName: any){
        var keyvault = `${process.env.subscription}conm${process.env.env}${process.env.locationshortcut}securekv`
        var token = await TokenGenerators.generateKeyVaultAccessToken();
        var config = {  
            method: 'get',
            url: `https://${keyvault}.vault.azure.net/secrets/${secretName}?api-version=2016-10-01`,
            headers: { "Authorization": `Bearer ${token}` }
        };
        var response = await TokenGenerators.request(config);
        return response.data;

    }
}
