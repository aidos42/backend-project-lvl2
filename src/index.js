import * as fs from 'fs';
import parser from './parsers.js';
import getDiff from './getDiff.js';
import makeStylish from './stylish.js';

const formatDiff = (formatter = 'stylish', diff) => {
  if (formatter === 'stylish') {
    return makeStylish(diff);
  }
  return 0;
};

export default (path1, path2, formatter = 'stylish') => {
  const file1Raw = fs.readFileSync(path1);
  const file2Raw = fs.readFileSync(path2);
  const file1 = parser(file1Raw, path1);
  const file2 = parser(file2Raw, path2);

  const diff = getDiff(file1, file2);

  const result = formatDiff(formatter, diff);
  return result;
};
