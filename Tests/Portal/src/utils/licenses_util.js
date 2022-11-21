const { default: axios } = require('axios');
const { BlobServiceClient } = require("@azure/storage-blob");
const excludePackage = require("../resources/foss-package-to-exclude.json")

exports.LicensesUtil = class LicensesUtil {
    static async streamToText(readable) {
        readable.setEncoding('utf8');
        let data = '';
        for await (const chunk of readable) {
            data += chunk;
        }
        return data;
    }

    static async getBlackDuckResult() {
        const token = process.env.blackDuckToken;
        const authUrl = process.env.blackDuckAuthUrl;
        const configForToken = {
            method: 'post',
            url: authUrl,
            headers: { "Authorization": `token ${token}` }
        }

        const resForToken = await axios(configForToken);
        const accessToken = resForToken.data.bearerToken;

        const packagesUrl = process.env.blackDuckPkgsUrl;
        const configForResults = {
            method: 'get',
            url: packagesUrl,
            headers: { "Authorization": `Bearer ${accessToken}` }
        }

        const resForPkgs = await axios(configForResults);
        const data = resForPkgs.data;

        return data;
    }

    static async getLicense() {
        const containerName = "osslicensecontainer";
        const accountName = `${process.env.subscription}conm${process.env.env}${process.env.locationshortcut}cmpkgsa`
        const accountKey = process.env.licenseStorageAccountKey || "";

        if (accountKey === "")
            return "";

        const blobServiceClient = BlobServiceClient.fromConnectionString(`DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        let blockBlobClient = containerClient.getBlockBlobClient("cm-oss-disclosure-statement.txt");
        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        const license = await this.streamToText(downloadBlockBlobResponse.readableStreamBody);

        return license;
    }

    static getLicenseString(pkgDetails) {
        let licenseString = '';
        for (let license of pkgDetails) {
            if (license.spdxId === undefined && license.licenses.length === 0) {
                licenseString = license.licenseDisplay.trim();
            } else if (license.spdxId === undefined) {
                for (let subLicense of license.licenses) {
                    licenseString += `${subLicense.spdxId} and `;
                }
                licenseString = licenseString.slice(0, -5);
            } else {
                licenseString = license.spdxId.trim();
            }
        }

        return licenseString;
    }

    static getTotalPackages(fossLicenseContent, packages) {
        let count = 0;
        for (const item of packages) {
            if (fossLicenseContent.indexOf(`${item.componentName} ${item.componentVersionName}`) !== -1
                || excludePackage[item.componentName]) {
                count++;
            }
        }

        return count;
    }

    static getPackageDescription(fossLicenseContent, startIndex) {
        let endIndex = 0;
        for (let i = startIndex; fossLicenseContent.charAt(i) !== '\n'; i++) {
            endIndex = i;
        }

        return fossLicenseContent.substring(startIndex, endIndex + 1);
    }

    static isCopyrightTextPresent(fossLicenseContent, startIndex) {
        if (startIndex == -1)
            return false;

        let copyrightString = fossLicenseContent.substring(startIndex-2000, startIndex + 2000);

        if (!copyrightString.includes("Copyright notice(s)"))
            return false;

        if (!copyrightString.includes("License text(s)"))
            return false;

        if (copyrightString.indexOf("Copyright") === copyrightString.lastIndexOf("Copyright") && !copyrightString.includes("Microsoft Corporation."))
            return false;

        return true;
    }
}
