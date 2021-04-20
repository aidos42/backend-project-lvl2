#!/usr/bin/env node
import program from 'commander';
import gendiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<path1> <path2>')
  .action((path1, path2) => {
    console.log(gendiff(path1, path2));
  });
program.parse(process.argv);
