import { test, expect, describe } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('json', () => {
  test('two not empty files', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    const expectedAnswer = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
    expect(gendiff(path1, path2)).toBe(expectedAnswer);
  });

  test('source file is not empty file, target is empty', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file3.json');
    const expectedAnswer = '{\n- follow: false\n- host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n}';
    expect(gendiff(path1, path2)).toBe(expectedAnswer);
  });

  test('source file is empty file, target is not empty', () => {
    const path1 = getFixturePath('file3.json');
    const path2 = getFixturePath('file1.json');
    const expectedAnswer = '{\n+ follow: false\n+ host: hexlet.io\n+ proxy: 123.234.53.22\n+ timeout: 50\n}';
    expect(gendiff(path1, path2)).toBe(expectedAnswer);
  });

  test('source file is empty file, target is also empty', () => {
    const path1 = getFixturePath('file3.json');
    const path2 = getFixturePath('file3.json');
    const expectedAnswer = '{\n\n}';
    expect(gendiff(path1, path2)).toBe(expectedAnswer);
  });
});

describe('yaml', () => {
  test('two not empty files', () => {
    const path1 = getFixturePath('file1.yml');
    const path2 = getFixturePath('file2.yml');
    const expectedAnswer = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
    expect(gendiff(path1, path2)).toBe(expectedAnswer);
  });

  test('source file is not empty file, target is empty', () => {
    const path1 = getFixturePath('file1.yml');
    const path2 = getFixturePath('file3.yml');
    const expectedAnswer = '{\n- follow: false\n- host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n}';
    expect(gendiff(path1, path2)).toBe(expectedAnswer);
  });

  test('source file is empty file, target is not empty', () => {
    const path1 = getFixturePath('file3.yml');
    const path2 = getFixturePath('file1.yml');
    const expectedAnswer = '{\n+ follow: false\n+ host: hexlet.io\n+ proxy: 123.234.53.22\n+ timeout: 50\n}';
    expect(gendiff(path1, path2)).toBe(expectedAnswer);
  });

  test('source file is empty file, target is also empty', () => {
    const path1 = getFixturePath('file3.yml');
    const path2 = getFixturePath('file3.yml');
    const expectedAnswer = '{\n\n}';
    expect(gendiff(path1, path2)).toBe(expectedAnswer);
  });
});
