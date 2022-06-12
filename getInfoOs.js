import os from "os";
import { OPERATION_FAILED } from "./const.js";

export const getInfoOs = async (arg) => {
  switch (arg) {
    case "--EOL":
      const EOL = os.EOL;
      console.log(JSON.stringify(EOL));
      break;
    case "--cpus":
      const cpus = os.cpus();
      console.log(`Total amount of cpus is ${cpus.length}`);
      cpus.forEach((cpu) => {
        console.log(`${cpu.model} - ${cpu.speed / 1000}GHz`);
      });
      break;
    case "--homedir":
      console.log(os.homedir());
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--architecture":
      console.log(os.platform());
      break;
    default:
      console.log(OPERATION_FAILED);
  }
};