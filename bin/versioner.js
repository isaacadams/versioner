#!/usr/bin/env node

let program = require('commander');

program
    .version('0.1.0')
    .description('Versioner, helping developers manage their versions');

let { main } = require('./../dist/cli');
main();

program.parse(process.argv);