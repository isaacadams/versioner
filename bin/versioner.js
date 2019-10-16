#!/usr/bin/env node

let command = process.argv[2];
require('../dist/cli').cli(command);