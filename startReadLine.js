import readline from 'readline';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs';
import { __dirname, __filename } from './const.js';
import { list } from './list.js';
import { readFile } from './readFile.js';
import { removeFile } from './removeFile.js';
import { copyFile } from './copyFile.js';
import { renameFile } from './renameFile.js';
import { createFile } from './createFile.js';
import { moveFile } from './moveFile.js';
import { getInfoOs } from './getInfoOs.js';
import { hashFile } from './hashFile.js';
import { compress } from './compress.js';
import { decompress } from './decompress.js';
import { byeText } from './index.js';
import { OPERATION_FAILED, INVALID_INPUT } from './const.js';

let currentDirectory = process.env.USERPROFILE || __dirname;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

// const stats = fs.stat();

export const startReadLine = async () => {
  let filePath, newFilePath, tempDirectory, tempData;

  showCurrentDirectory();
  
  rl.on('line', async (input) => {
    const arrayCommandAndArgs = input.split(' ');
    const command = arrayCommandAndArgs[0];
    const args = arrayCommandAndArgs.slice(1).join(' ');
  
    switch (command) {
      case 'os':
        getInfoOs(args);
        break;
      case 'cd':
        tempDirectory = getFilePath(args);
        fs.access(tempDirectory, fs.constants.F_OK, (err) => {
          if (err) {
            console.error(OPERATION_FAILED);
            showCurrentDirectory();
           } else {
            currentDirectory = tempDirectory;
            showCurrentDirectory();
          }
        });
        break;
      case 'rm':
        filePath = getFilePath(args);
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error(OPERATION_FAILED);
            showCurrentDirectory();
           } else {
            removeFile(filePath);
          }
        });
        break;
      case 'rn':
        tempData = args.split(' ');
        if (tempData.length !== 2) {
          console.error(INVALID_INPUT);
          showCurrentDirectory();
          break;
        }
        filePath = path.join(currentDirectory, tempData[0]);
        newFilePath = path.join(currentDirectory, tempData[1]);
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error(OPERATION_FAILED);
            showCurrentDirectory();
          } else {
            renameFile(filePath, newFilePath);
          }
        });
        break;
      case 'mv':
        filePath = path.join(currentDirectory, args.split(' ')[0]);
        newFilePath = path.join(currentDirectory, args.split(' ')[1], path.basename(filePath));
        moveFile(filePath, newFilePath);
        break;
      case 'cp':
        tempData = args.split(' ');
        if (tempData.length !== 2) {
          console.error(INVALID_INPUT);
          showCurrentDirectory();
          break;
        }
        filePath = getFilePath(tempData[0]);
        newFilePath = getFilePath(tempData[1]);
        console.log(filePath, newFilePath);
        fs.lstat(newFilePath, (err, stats) => {
          if (err) {
            console.error(OPERATION_FAILED);
            showCurrentDirectory();
          } else {
            if (stats.isDirectory()) {
              newFilePath = path.join(newFilePath, path.basename(filePath)) ;
            }
            fs.access(filePath, fs.constants.F_OK, (err) => {
              if (err) {
                console.error(OPERATION_FAILED);
                showCurrentDirectory();
              } else {
                console.log('Args: ');
                console.log(filePath, newFilePath);
                copyFile(filePath, newFilePath);
              }
            });
          }
        });
        break;
      case 'add':
        filePath = getFilePath(args);
        console.log(`You chose add file ${filePath}`);
        createFile(filePath);
        break;
      case 'cat':
        filePath = getFilePath(args);
        readFile(filePath);
        break;
      case 'ls':
        list(currentDirectory);
        break;
      case 'up':
        currentDirectory = path.join(currentDirectory, '..');
        showCurrentDirectory();
        break;
      case 'hash':
        filePath = getFilePath(args);
        hashFile(filePath);
        break;
      case 'compress':
        filePath = path.join(currentDirectory, args.split(' ')[0]);
        newFilePath = path.join(currentDirectory, args.split(' ')[1], path.parse(filePath).base + '.br');
        compress(filePath, newFilePath);
        break;
      case 'decompress':
        filePath = path.join(currentDirectory, args.split(' ')[0]);
        newFilePath = path.join(currentDirectory, args.split(' ')[1], path.parse(filePath).name);
        decompress(filePath, newFilePath);
        break;
      case '.exit':
        console.log(byeText);
        rl.pause();
        break;
      default:
        console.log(INVALID_INPUT);
    }
  });
  
  rl.on('SIGINT', () => {
    console.log(byeText);
    rl.pause();
  });
}

export function showCurrentDirectory() {
  console.log(`You are currently in ${currentDirectory}`);
  rl.prompt();
}

function getFilePath(pathDirectory) {
  return path.isAbsolute(pathDirectory) ? pathDirectory : path.join(currentDirectory, pathDirectory);
}