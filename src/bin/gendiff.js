#!/usr/bin/env node
import commander from 'commander';

const program = commander;

program
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows the difference.')
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);

