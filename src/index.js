import * as fs from 'fs';
import parser from './parsers.js';
import getDiff from './getDiff.js';
import makeStylish from './stylish.js';

export default (path1, path2) => {
  const file1Raw = fs.readFileSync(path1);
  const file2Raw = fs.readFileSync(path2);
  const file1 = parser(file1Raw, path1);
  const file2 = parser(file2Raw, path2);

  const diff = getDiff(file1, file2);

  console.log(diff);

  const result = makeStylish(diff);

  return result;
};
