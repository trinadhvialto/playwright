import XLSX from 'xlsx';
import _ from 'lodash';
export class DocsReaderHelper {

    static async readDataFromExcelorCSV(filePath: string) {
        const workbook = XLSX.readFile(filePath, { cellStyles: true });
        const sheet_name_list = workbook.SheetNames;
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        const tempTwoDimentionalArr = new Array(_.keys(excelData[0]).length);
        for (var i = 0; i < tempTwoDimentionalArr.length; i++) {
            tempTwoDimentionalArr[i] = new Array();
        }
        return _.map(excelData, function (obj) {
            return _.reduce(_.keys(excelData[0]), function (result, columnName, index) {
                tempTwoDimentionalArr[index].push(obj[columnName])
                result[columnName] = tempTwoDimentionalArr[index];
                return result;
            }, {})
        })[0];
    }
}