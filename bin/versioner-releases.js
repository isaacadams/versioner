#!/usr/bin/env node
let program = require('commander');
let { createReleaseBranches } = require('../dist/cli');

program
    .action(createReleaseBranches)
    .parse(process.argv);