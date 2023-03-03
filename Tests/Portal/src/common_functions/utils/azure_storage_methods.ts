var DOMParser = require('xmldom').DOMParser;
import { XmlToJson } from './xmlToJson';
var CryptoJS = require('crypto-js');
import { TokenGenerators } from './api_axios'
export class AzureStorageMethods{
    static async getblobs(storageAccount: any,containerName: any,storageAccountKey: any, apiMethodName: string,blobFilterName=""){
        var header_date = new Date().toUTCString();
        var apiMethod = apiMethodName.toUpperCase();
        
        var url = new URL(`https://${storageAccount}.blob.core.windows.net/${containerName}?restype=container&comp=list&prefix=${blobFilterName}`);
        const signatureParts = [apiMethod,"","","","","","","","","","",""]


        const canonicalHeaderParts = [];
        canonicalHeaderParts.push(`x-ms-date:${header_date}`);
        canonicalHeaderParts.push(`x-ms-version:2018-03-28`);


        // Add headers to signature
        signatureParts.push.apply(signatureParts, canonicalHeaderParts);

        // Construct CanonicalizedResource
        const canonicalResourceParts = [`/${storageAccount}${url.pathname}`];
        const canonicalQueryNames: string[] = [];
        url.searchParams.forEach(function(value, key) {
            canonicalQueryNames.push(key.toLowerCase());
        });
        canonicalQueryNames.sort();
        canonicalQueryNames.forEach(queryName => {
            const value = url.searchParams.get(queryName);

            canonicalResourceParts.push(`${queryName}:${value}`);
        });
        // Add resource to signature
        signatureParts.push.apply(signatureParts, canonicalResourceParts);

        // Now, construct signature raw string
        const signatureRaw = signatureParts.join("\n");

        // Hash it using HMAC-SHA256 and then encode using base64

        const signatureBytes = CryptoJS.HmacSHA256(signatureRaw, CryptoJS.enc.Base64.parse(storageAccountKey));
        const signatureEncoded = signatureBytes.toString(CryptoJS.enc.Base64);

        var config = {  
        method: apiMethod,
        url: `https://${storageAccount}.blob.core.windows.net/${containerName}?restype=container&comp=list&prefix=${blobFilterName}`,
        headers: { "Authorization": `SharedKey ${storageAccount}:${signatureEncoded}` ,
                    "x-ms-date": header_date,
                    "x-ms-version": "2018-03-28"},
                  };

        var response = await TokenGenerators.request(config); 
        var apiData = response.data 
        var XmlNode = new DOMParser().parseFromString(apiData, 'text/xml');     
        var jsonObj = await XmlToJson.xmlToJson(XmlNode);
        var blobs = jsonObj.EnumerationResults.Blobs.Blob;
        var newBlobs = [];
        if (blobs.length) {
            for (var i = 0; i < blobs.length; i++){
                var blob = {"fileName": (blobs[i].Name['#text']).replace(blobFilterName,""),
                            "modifiedTime": (Date.parse(blobs[i].Properties['Last-Modified']['#text'])),
                            "status": Math.floor(Date.now() - (Date.parse(blobs[i].Properties['Last-Modified']['#text']))/1000) > 30 ? 1 : 0,
                            }
                newBlobs.push(blob)
            }
        } else if(blobs.fileName){
            var blob = {"fileName": (blobs.Name['#text']).replace(blobFilterName,""),
                            "modifiedTime": (Date.parse(blobs.Properties['Last-Modified']['#text'])),
                            "status": Math.floor(Date.now() - (Date.parse(blobs.Properties['Last-Modified']['#text']))/1000) > 30 ? 1 : 0,
                            }
            newBlobs.push(blob)
        }
        
        newBlobs.sort((a,b)=> a.fileName > b.fileName ? 1 : ((b.fileName > a.fileName) ? -1 : 0 ))
        newBlobs.sort((a, b) => a.modifiedTime < b.modifiedTime ? 1 : ((b.modifiedTime < a.modifiedTime) ? -1 : 0))
        
        return newBlobs;
    }

    
    
  
    
}
