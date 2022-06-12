import fs from 'fs';
import { OPERATION_FAILED } from './const.js';
import { showCurrentDirectory } from './startReadLine.js';

export const createFile = async (file, content = '') => {

  fs.access(file, (err) => {
    if (err) {
      fs.writeFile(file, content, 'utf8', (err) => {
        if (err) {
          console.error(OPERATION_FAILED);
        } else {
          console.log(`File ${file} created`);
          showCurrentDirectory();
        }
        })
    } else {
      console.error(OPERATION_FAILED);
    }
  });
};
