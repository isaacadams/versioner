#!/usr/bin/env node
let program = require('commander');
let { version } = require('../dist/cli');

program
    .action(version)
    .parse(process.argv);