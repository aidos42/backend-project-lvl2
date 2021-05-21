import * as fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  const extensions = ['json', 'yml'];
  const formats = ['stylish', 'plain', 'json'];
  const expectedAnswers = {
    stylish: readFixture('stylish-result.txt'),
    plain: readFixture('plain-result.txt'),
    json: readFixture('json-result.txt'),
  };

  test('default option', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    expect(gendiff(path1, path2)).toBe(expectedAnswers.stylish);
  });

  describe.each(extensions)('%s data', (extension) => {
    const path1 = getFixturePath(`file1.${extension}`);
    const path2 = getFixturePath(`file2.${extension}`);

    test.each(formats)('%s two not empty files', (format) => {
      expect(gendiff(path1, path2, format)).toBe(expectedAnswers[format]);
    });
  });
});
