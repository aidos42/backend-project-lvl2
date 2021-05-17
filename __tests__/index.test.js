import * as fs from 'fs';
import { describe } from 'jest-circus';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  const inputFormats = ['json', 'yml'];
  const outputFormats = ['stylish', 'plain', 'json'];
  const expectedAnswers = {
    stylish: readFixture('stylish-result.txt'),
    plain: readFixture('plain-result.txt'),
    json: readFixture('json-result.txt'),
  };

  describe.each(inputFormats)('%s data', (inputFormat) => {
    const path1 = getFixturePath(`file1.${inputFormat}`);
    const path2 = getFixturePath(`file2.${inputFormat}`);

    test.each(outputFormats)('%s two not empty files', (outputFormat) => {
      expect(gendiff(path1, path2, outputFormat)).toBe(expectedAnswers[outputFormat]);
    });
  });
});
