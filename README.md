# playwright helpers

playwright helpers is a helper library for dealing with utilities.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install playwright.

```bash
npm install playwright
```

## Usage

```typescript
import path from 'node:path';
import { DocsReaderHelper } from '../../../helpers/docs-reader-helper';

  test("read data from excel file", async ()=>{
        const pathtoExcel =path.resolve(__dirname,"../../../../resources/**/**.xlsx");
        const excelData = await DocsReaderHelper.readDataFromExcelorCSV(pathtoExcel);
        console.log(excelData);

         const pathtoExcel =path.resolve(__dirname,"../../../../resources/**/**.csv");
        const csvData = await DocsReaderHelper.readDataFromExcelorCSV(pathtoExcel);
        console.log(csvData);
    })

# returns 'object'
{
  Username: [ '***', '***'],
  Identifier: ['***', '***'],
  'First name': ['***', '***'],
  'Last name': ['***', '***']
}


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.