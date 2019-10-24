#!/usr/bin/env node
let program = require('commander');
let { main } = require('../dist/init/cli');

program
    .action(main)
    .parse(process.argv);