import { BasePage, clientadmindashboardjson, mytriptravalerhomepagejson, DocumentUtility, config, expect} from "../../..";
import path from 'path';
import _ from 'lodash';
export class ClientAdminDashboard extends BasePage {

    async navigateClientAdminDashboardPage() {
        await this.clickonWebElement(mytriptravalerhomepagejson.clientAdminDashboardLink);
        await this.isElementPresent(clientadmindashboardjson.userProfileBtn);
    }
    async downloadUserProfile(downloadFileName: string) {
        console.log(config.use.downloadsPath);
        const filePath = path.resolve(config.use.downloadsPath, downloadFileName);
        await this.downloadAFile(clientadmindashboardjson.userProfileTile.downloadProfileTemplateBtn, filePath);
    }

    async UpdateExcelFile(updatedData: Array<Object>, fileName: string) {
        await DocumentUtility.updateExcelData(path.resolve(config.use.downloadsPath, fileName), 'Home country update', updatedData);
        await this.page.reload();

    }

    async uploadAFile(uploadFileName: string, resultFile: string) {
        // this.uploadAFileWithresultDownloadFile(clientadmindashboardjson.userProfileTile.uploadFile, filePath, filePath2);
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        const downloadPromise = this.page.waitForEvent('download');
        await this.clickonWebElement(clientadmindashboardjson.userProfileTile.uploadFile);
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.resolve(config.use.downloadsPath, uploadFileName));
        const download = await downloadPromise;
        // Wait for the download process to complete
        console.log("download", await download.path());
        await download.saveAs(path.resolve(config.use.downloadsPath, resultFile));
    }

    async readAndCompareExcelAsKeyValPair(fileName: string, expectedData: object) {
        const excelData = await DocumentUtility.readData(path.resolve(config.use.downloadsPath, fileName));
        const worksheet = excelData.Sheets["Summary"];
        const data = {};
        for (let i = 1; i <= parseInt(worksheet['!ref'].split(':')[1][1]); i++) {
            const key = worksheet[`A${i}`].v;
            const value = worksheet[`B${i}`].v;
            data[key] = value;
        }
        expect(data).toEqual(expectedData);
    }

    async deleteFilesUnderDir() {
        await DocumentUtility.deleteAllFilesUnderDIr(config.use.downloadsPath);
    }
}