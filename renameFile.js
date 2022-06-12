import * as fs from 'fs';
import { OPERATION_FAILED } from './const.js';
import { showCurrentDirectory } from './startReadLine.js';

export const renameFile = async (file, newFile) => {
  fs.rename(file, newFile, (err) => {
    if (err) {
      console.error(OPERATION_FAILED);
    } else {
      console.log('File rename successfully');
      showCurrentDirectory();
    }
  })
};
