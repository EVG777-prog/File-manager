import fs from 'fs';
import { OPERATION_FAILED } from './const.js';
import { showCurrentDirectory } from './startReadLine.js';

export const copyFile = async (filePath, newFilePath) => {

  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(newFilePath);

  readStream.on('error', (err) => {
    if (err) {
      console.error(OPERATION_FAILED);
    }
  });

  readStream.on('end', (err) => {
    if (err) {
      console.error(OPERATION_FAILED);
    } else {
      console.log(`File ${filePath} copied to ${newFilePath}`);
      showCurrentDirectory();
    }
  });

  readStream.pipe(writeStream);
};
