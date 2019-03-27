#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig);
    console.log(diff);
  })
  .parse(process.argv);
