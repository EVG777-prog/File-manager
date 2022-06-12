import crypto from 'crypto';
import fs from 'fs';
import { OPERATION_FAILED } from './const.js';
import { showCurrentDirectory } from './startReadLine.js';

export const hashFile = async (filePath) => {
  const readStream = fs.createReadStream(filePath);
  const hash = crypto.createHash('sha256');
  readStream
    .on('data', (data) => {
      hash.update(data);
    })
    .on('end', () => {
      const hashValue = hash.digest('hex');
      console.log(`Hash: ${hashValue}`);
      showCurrentDirectory();
    })
    .on('error', (err) => {
      console.error(OPERATION_FAILED);
      showCurrentDirectory();
    });
};
