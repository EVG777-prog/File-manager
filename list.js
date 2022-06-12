import { __dirname, OPERATION_FAILED } from "./const.js";
import fs from "fs";
import { showCurrentDirectory } from "./startReadLine.js";

export const list = async (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(OPERATION_FAILED);
    } else {
      console.log(`Files and folders:`);
      files.forEach((file) => {
        console.log(file);
      });
      showCurrentDirectory();
    }
  })
};