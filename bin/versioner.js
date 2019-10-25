#!/usr/bin/env node

let program = require('commander');

program
    .version('0.1.0')
    .description('Versioner, helping developers manage their versions');

let { main } = require('./../dist/cli');
main();

program.parse(process.argv);

let NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.help();
}