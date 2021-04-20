import * as fs from 'fs';
import _ from 'lodash';

const readFile = (path) => fs.readFileSync(path);

export default (path1, path2) => {
  const file1 = JSON.parse(readFile(path1));
  const file2 = JSON.parse(readFile(path2));
  const file1Keys = Object.keys(file1).sort();
  const file2Keys = Object.keys(file2).sort();
  const array = [];
  const filesKeys = [...new Set([...file1Keys, ...file2Keys])].sort();
  filesKeys.forEach((key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        array.push(`  ${key}: ${file1[key]}`);
      } else {
        array.push(`- ${key}: ${file1[key]}`);
        array.push(`+ ${key}: ${file2[key]}`);
      }
    } else if (_.has(file1, key)) {
      array.push(`- ${key}: ${file1[key]}`);
    } else {
      array.push(`+ ${key}: ${file2[key]}`);
    }
  });
  const line = array.join('\n');
  const result = `{\n${line}\n}`;
  return result;
};
