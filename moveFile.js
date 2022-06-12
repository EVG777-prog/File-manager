import fs from 'fs';
import { OPERATION_FAILED } from './const.js';
import { showCurrentDirectory } from './startReadLine.js';

export const moveFile = async (filePath, newFilePath) => {

  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(newFilePath);

  readStream
    .on('error', (err) => {
      if (err) {
        console.error(OPERATION_FAILED);
      }
    })
    .on('end', (err) => {
      if (err) {
        console.error(OPERATION_FAILED);
      } else {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(OPERATION_FAILED);
          } else {
            console.log(`File ${filePath} moved!`);
            showCurrentDirectory();
          }
        });
      }
    });

  readStream.pipe(writeStream);
};
