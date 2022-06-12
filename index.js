import { __dirname, __filename } from './const.js';
import { startReadLine } from './startReadLine.js';

const args = process.argv.slice(2);

const userName = args.find((arg) => arg.startsWith('--username=')).split('=')[1] || 'Guest';

const welcomeText = `Welcome to the File Manager, ${userName}!`;
export const byeText = `Thank you for using File Manager, ${userName}!`;
console.log(welcomeText);

startReadLine();


