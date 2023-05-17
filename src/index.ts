import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';
import log from './utils/log';
import { findAndroidFolder } from './utils/findAndroidFolder';

export default async function run() {
  const args = process.argv;

  const cleanBuildCacheArg = args.find(element => element === '--cleanBuildCache');

  const commandGradlew = os.platform() === 'win32' ? `gradlew` : `./gradlew`;

  const gradlewAction = cleanBuildCacheArg ? ['cleanBuildCache'] : ['clean'];

  const currentDirectory = process.cwd();

  const androidFolder = findAndroidFolder(currentDirectory);

  if (fs.existsSync(androidFolder)) {
    const gradlewPath = path.join(androidFolder, 'gradlew');

    if (fs.existsSync(gradlewPath)) {

      log.info(`Found Android Project in ${androidFolder}`)

      const childProcess = spawn('cd', [androidFolder], { shell: true });

      childProcess.on('close', (code) => {
        if (code === 0) {
          const commandProcess = spawn(commandGradlew, gradlewAction, { cwd: androidFolder });

          commandProcess.stdout.on('data', (data) => {
            log.log(data.toString());
          });

          commandProcess.stderr.on('data', (data) => {
            log.error(data.toString());
          });

          commandProcess.on('close', (code) => {
            if(code === 0){
              log.success(`${commandGradlew} ${gradlewAction} finished successfully`);
            }else{
              log.warning(`The command was closed with the code ${code}`);
            }
          });
        } else {
          log.error(`It was not possible to access the folder ${androidFolder}`);
        }
      });

    } else {
      log.error('The gradlew file was not found.');
    }
  } else {
    log.error('The Android folder was not found.');
  }

}