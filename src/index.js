import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers.js';
import { buildDiff } from './buildDiff.js';
import format from './formatters/index.js';

export default (path1, path2, formatter = 'stylish') => {
  const content1 = fs.readFileSync(path1);
  const content2 = fs.readFileSync(path2);
  const format1 = path.extname(path1).slice(1);
  const format2 = path.extname(path2).slice(1);
  const data1 = parse(content1, format1);
  const data2 = parse(content2, format2);

  const diff = buildDiff(data1, data2);

  return format(diff, formatter);
};
