#!/usr/bin/env node

let program = require('commander');

program
    .command('init <project>', 'initialize versioner for your project')
    .command('version <part>', 'managing the version')
    .command('inc', 'increment your local version')
    .command('releases', 'create release branches based on the current version')
    .parse(process.argv);