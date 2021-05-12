import * as fs from 'fs';
import parse from './parsers.js';
import getDiff from './getDiff.js';
import formatDiff from './formatters/formatDiff.js';

export default (path1, path2, formatter = 'stylish') => {
  const file1Raw = fs.readFileSync(path1);
  const file2Raw = fs.readFileSync(path2);
  const file1 = parse(file1Raw, path1);
  const file2 = parse(file2Raw, path2);

  const diff = getDiff(file1, file2);

  const result = formatDiff(formatter, diff);

  return result;
};
