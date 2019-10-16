#!/usr/bin/env node
let program = require('commander');
let { increment } = require('../dist/cli');

program
    .action(increment)
    .parse(process.argv);