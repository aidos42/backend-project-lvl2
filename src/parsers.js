import yaml from 'js-yaml';
import * as path from 'path';

const parse = (file, filePath) => {
  const format = path.extname(filePath);
  if (format === '.json') {
    return JSON.parse(file);
  }

  const result = yaml.load(file);
  if (result === undefined) {
    return {};
  }

  return result;
};

export default parse;
