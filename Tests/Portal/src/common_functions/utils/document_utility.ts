import XLSX from 'xlsx';
import _ from 'lodash';
import fs from "node:fs/promises";
import path from "node:path";
export class DocumentUtility {

    static async readData(filePath: string) {
        return XLSX.readFile(filePath, { cellDates:true, bookVBA:true, sheetStubs:true, cellNF:true });
    }

    static async readDataFromExcelorCSV(filePath: string) {
        const workbook = await DocumentUtility.readData(filePath);
        const sheet_name_list = workbook.SheetNames;
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        // const tempTwoDimentionalArr = new Array(_.keys(excelData[0]).length);
        // for (var i = 0; i < tempTwoDimentionalArr.length; i++) {
        //     tempTwoDimentionalArr[i] = new Array();
        // }
        // return _.map(excelData, function (obj) {
        //     return _.reduce(_.keys(excelData[0]), function (result, columnName, index) {
        //         tempTwoDimentionalArr[index].push(obj[columnName])
        //         result[columnName] = tempTwoDimentionalArr[index];
        //         return result;
        //     }, {})
        // })[0];
    }

    static async filterData(filePath: string, sheetName: string, filterObject: object) {
        let fileData = await DocumentUtility.readData(filePath);
        return _.filter(XLSX.utils.sheet_to_json(fileData.Sheets[sheetName]), filterObject)
    }

    static async updateExcelData(filePath: string, sheetName: string, exportData: Array<object>) {
        const workbook = await DocumentUtility.readData(filePath);
        workbook.Sheets[sheetName] = XLSX.utils.json_to_sheet(exportData);
        XLSX.writeFile(workbook, filePath);
    }

    static async deleteAllFilesUnderDIr(dirPath: string){
        for (const file of await fs.readdir(dirPath)) {
            await fs.unlink(path.join(dirPath, file));
          }
    }


}