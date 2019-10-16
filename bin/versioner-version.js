#!/usr/bin/env node
let program = require('commander');
let { version } = require('../dist/cli');

program
    .option('-u --update', 'update the bumped version')
    .action(version)
    .parse(process.argv);