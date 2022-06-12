import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import { showCurrentDirectory } from './startReadLine.js';
import { OPERATION_FAILED } from './const.js';

export const decompress = async (fileArchivedPath, filePath) => {
  if (!fileArchivedPath || !filePath) {
    console.error(OPERATION_FAILED);
    return;
  }

  const gzip = zlib.BrotliDecompress();

  const source = fs.createReadStream(fileArchivedPath);
  const destination = fs.createWriteStream(filePath);

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error(OPERATION_FAILED);
      process.exitCode = 1;
    } else {
      console.log('File decompressed!');
      showCurrentDirectory();
    }
  });
};
