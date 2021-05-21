import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import formatDiff from './formatters/formatDiff.js';

export default (path1, path2, formatter = 'stylish') => {
  const content1 = fs.readFileSync(path1);
  const content2 = fs.readFileSync(path2);
  const extension1 = path.extname(path1);
  const extension2 = path.extname(path2);
  const data1 = parse(content1, extension1);
  const data2 = parse(content2, extension2);

  const diff = buildDiff(data1, data2);

  return formatDiff(formatter, diff);
};
