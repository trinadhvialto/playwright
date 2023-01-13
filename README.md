# playwright

<details>
  <summary>playwright helpers</summary><br/>

## playwright helpers

playwright helpers is a helper library for dealing with utilities.

  <details>
  <summary>excel utilities</summary><br/>

### Installation

Use the package manager [npm](https://www.npmjs.com/) to install xlsx.

```bash
npm install xlsx
```

### Usage

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

#### output(keys are specific to excel file)
{
  Username: [ '***', '***'],
  Identifier: ['***', '***'],
  'First name': ['***', '***'],
  'Last name': ['***', '***']
}
```
<br />

## Contribution

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
</details>

</details>


