import fs from 'fs';
import os from 'os';
import { stdout } from 'process';
import { OPERATION_FAILED } from './const.js';
import { showCurrentDirectory } from './startReadLine.js';


export const readFile = async (file) => {
  const readStream = fs.createReadStream(file);
  readStream
    .on('data', (chunk) => stdout.write(chunk))
    .on('end', () => {
      stdout.write(os.EOL);
      showCurrentDirectory();
    })
    .on('error', (err) => console.error(OPERATION_FAILED));
};
