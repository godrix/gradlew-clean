import fs from 'fs';
import path from 'path';
import log from '../utils/log'

export const findAndroidFolder = (directory: string) => {
  const directoryContent = fs.readdirSync(directory);

  for (const item of directoryContent) {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      if (item.toLowerCase() === 'android') {
        log.info(itemPath);
        return itemPath;
      } else {
        const result = findAndroidFolder(itemPath);
        if (result) {
          return result;
        }
      }
    }
  }
}