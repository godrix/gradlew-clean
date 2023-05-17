import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import os from 'os';
import { argv } from 'yargs';
import {findAndroidFolder} from './utils/findAndroidFolder';
import log from './utils/log';

export default async function run() {
  const response = await argv;

  const appOptions = ['cleanBuildCache'];

  const filteredEntries = Object.entries(response).filter(([key]) => key !== '_' && key !== '$0');

  const aplicationArgs = Object.fromEntries(
    filteredEntries.filter(([key]) => appOptions.includes(key))
  ) as { [k: string]: string; }

  const gradlewCmd = aplicationArgs.cleanBuildCache ? 'cleanBuildCache'  : 'clean';

  
  const currentDirectory = process.cwd();
  
  const androidFolder = findAndroidFolder(currentDirectory);

  const commandCd = os.platform() === 'win32' ? 
      `cd /d ${androidFolder} && gradlew ${gradlewCmd}` : 
      `cd ${androidFolder} && ./gradlew ${gradlewCmd}`;

  if (fs.existsSync(androidFolder)) {

    const gradlewPath = path.join(androidFolder, 'gradlew'); 

    if (fs.existsSync(gradlewPath)) {

      log.startLoading("Loading");
      exec(commandCd, (error, stdout, _) => {
        if (error) {
          log.error(`Error when executing the internal script: ${error}`);
          log.stopLoading()
          return;
        }
        
        log.stopLoading();
        log.success(stdout);
        
      });
    } else {
     log.error('The gradlew file was not found.');
    }
  } else {
    log.error('The Android folder was not found.');
  }

}