import * as fs from 'fs';
import { test, expect, describe } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedStylishAnswer = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
const expectedPlainAnswer = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
const expectedJsonAnswer = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');

describe('format stylish', () => {
  test('default option', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    expect(gendiff(path1, path2)).toBe(expectedStylishAnswer);
  });
  test('two not empty json files', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    expect(gendiff(path1, path2, 'stylish')).toBe(expectedStylishAnswer);
  });
  test('two not empty yaml files', () => {
    const path1 = getFixturePath('file1.yml');
    const path2 = getFixturePath('file2.yml');
    expect(gendiff(path1, path2, 'stylish')).toBe(expectedStylishAnswer);
  });
});

describe('format plain', () => {
  test('two not empty json files', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    expect(gendiff(path1, path2, 'plain')).toBe(expectedPlainAnswer);
  });
  test('two not empty yaml files', () => {
    const path1 = getFixturePath('file1.yml');
    const path2 = getFixturePath('file2.yml');
    expect(gendiff(path1, path2, 'plain')).toBe(expectedPlainAnswer);
  });
});

describe('format json', () => {
  test('two not empty json files', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    expect(gendiff(path1, path2, 'json')).toBe(expectedJsonAnswer);
  });
  test('two not empty yaml files', () => {
    const path1 = getFixturePath('file1.yml');
    const path2 = getFixturePath('file2.yml');
    expect(gendiff(path1, path2, 'json')).toBe(expectedJsonAnswer);
  });
});
