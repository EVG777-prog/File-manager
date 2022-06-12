import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import { showCurrentDirectory } from './startReadLine.js';
import { OPERATION_FAILED } from './const.js';

export const compress = async (filePath, fileArchivedPath) => {
  if (!fileArchivedPath || !filePath) {
    console.error(OPERATION_FAILED);
    showCurrentDirectory();
    return;
  }

  const gzip = zlib.BrotliCompress();

  const source = fs.createReadStream(filePath);
  const destination = fs.createWriteStream(fileArchivedPath);

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error(OPERATION_FAILED);
      showCurrentDirectory();
    } else {
      console.log(`File ${filePath} compressed!`);
      showCurrentDirectory();
    }
  });
  
};
