## Steps to Repro

- `npm install -g ts-node`
- `npm install`
- `ts-node test.ts`

### Error observed

```
Error running sample: TypeError: Class constructor Pipeline cannot be invoked without 'new'

    at new Pipeline (C:\Users\project-path\node_modules\@azure\storage-file-datalake\src\Pipeline.ts:99:5)

    at newPipeline (C:\Users\project-path\node_modules\@azure\storage-file-datalake\src\Pipeline.ts:198:10)

    at Function.DataLakeServiceClient.fromConnectionString (C:\Users\project-path\node_modules\@azure\storage-file-datalake\src\DataLakeServiceClient.ts:73:26)

    at main (C:\Users\project-path\test.ts:13:47)

    at Object.<anonymous> (C:\Users\project-path\test.ts:81:1)

    at Module._compile (node:internal/modules/cjs/loader:1101:14)

    at Module.m._compile (C:\Users\sanallur\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:1310:23)

    at Module._extensions..js (node:internal/modules/cjs/loader:1153:10)

    at Object.require.extensions.<computed> [as .ts] (C:\Users\sanallur\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:1313:12)

    at Module.load (node:internal/modules/cjs/loader:981:32)
```
