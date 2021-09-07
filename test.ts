/* 
 Setup: Enter your storage account name and shared key in main()
*/

import { DataLakeServiceClient } from "@azure/storage-file-datalake";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // List file systems
  const serviceClient = DataLakeServiceClient.fromConnectionString(
    process.env.STORAGE_CONNECTION_STRING || ""
  );

  let i = 1;
  for await (const filesystem of serviceClient.listFileSystems()) {
    console.log(`FileSystem ${i++}: ${filesystem.name}`);
  }

  // Create a filesystem
  const fileSystemName = `newfilesystem${new Date().getTime()}`;
  const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);

  const createFileSystemResponse = await fileSystemClient.create();
  console.log(
    `Create filesystem ${fileSystemName} successfully`,
    createFileSystemResponse.requestId
  );

  // Create a file
  const content = "hello";
  const fileName = "newfile" + new Date().getTime();
  const fileClient = fileSystemClient.getFileClient(fileName);
  await fileClient.create();
  await fileClient.append(content, 0, content.length);
  const flushFileResponse = await fileClient.flush(content.length);
  console.log(
    `Upload file ${fileName} successfully`,
    flushFileResponse.requestId
  );

  // List paths
  i = 1;
  for await (const path of fileSystemClient.listPaths()) {
    console.log(`Path ${i++}: ${path.name}, isDirectory:${path.isDirectory}`);
  }

  // Get file content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.contentAsBlob
  const readFileResponse = await fileClient.read();
  console.log(
    "Downloaded file content",
    (await streamToBuffer(readFileResponse.readableStreamBody!)).toString()
  );

  // Delete filesystem
  await fileSystemClient.delete();

  console.log("Deleted filesystem");
}

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(
  readableStream: NodeJS.ReadableStream
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data: Buffer | string) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

main().catch((err) => {
  console.error("Error running sample:", err);
});
