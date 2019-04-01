#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .version('0.0.7')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format [type]', 'Output formats: default, plain')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig, program.format);
    console.log(diff);
  })
  .parse(process.argv);
