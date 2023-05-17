import fs from 'fs';
import path from 'path';
import log from '../utils/log'

export const findAndroidFolder = (directory: string) => {
  const directoryContent = fs.readdirSync(directory);
  const gitIgnorePath = path.join(directory, '.gitignore');
  
  let ignoredDirectories: string[] = [];

  if (fs.existsSync(gitIgnorePath)) {
    const gitIgnoreContent = fs.readFileSync(gitIgnorePath, 'utf8');
    ignoredDirectories = gitIgnoreContent
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && !line.startsWith('!'));
  }

  for (const item of directoryContent) {
    if (ignoredDirectories.includes(item)) {
      continue;
    }

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