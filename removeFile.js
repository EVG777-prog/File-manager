import * as fs from 'fs';
import { OPERATION_FAILED } from './const.js';
import { showCurrentDirectory } from './startReadLine.js';

export const removeFile = async (file) => {
    fs.unlink(file, (err) => {
      if (err) {
        console.error(OPERATION_FAILED);
      } else {
        console.log(`File ${file} removed!`);
        showCurrentDirectory();
      }
    })
};

