#!/usr/bin/env node

let program = require('commander');

program
    .version('0.1.0')
    .description('Versioner, helping developers manage their versions');

let { main } = require('./../dist/cli');
main();

program
    .command('get')
    .description('get the current version')
    .option('')
    .option('get', 'Get the current version')
    .option('')
    .option('update', 'update the version')
    .option('-p --part <part>', 'part of the version to bump', 'patch')
    .action((command, options) => {
        console.log(command, options);
    });

program.parse(process.argv);
/* program
    .command('init <project>', 'initialize versioner for your project')
    .command('version <part>', 'managing the version')
    .command('inc', 'increment your local version')
    .command('releases', 'create release branches based on the current version')
    .parse(process.argv); 
    */

/*

commander
    .command('deployment <command>')
    .description('Manage deployment')
    .option('')
    .option('create', 'Create deployment')
    .option('--cloud <provider>', 'Cloud provider', 'aws')
    .option('--region <region>', 'Region', 'eu-central-1')
    .option('--prefix <prefix>', 'Resource prefix', 'tld-domain')
    .option('')
    .option('update', 'Update deployment')
    .option('--prefix <prefix>', 'Resource prefix', 'tld-domain')
    .action((command, options) => {
        console.log(command, options);
    }); */