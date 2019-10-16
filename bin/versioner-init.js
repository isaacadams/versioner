#!/usr/bin/env node
let program = require('commander');
let { newProject } = require('../dist/cli');

program
    .action(newProject)
    .parse(process.argv);