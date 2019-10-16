//import { runCommand, getCLIArgument, isNullUndefinedOrEmpty, getFullFilePath }  from './utilities';
//import path from 'path';
import program from 'commander';
import colors from 'colors';

let cli = function (arg) {

    switch (arg) {
        case 'init':   
            newProject();
            break;

        case 'inc':
            increment();
            break;

        case 'releases':
            createReleaseBranches();
            break;

        default:
            console.log('The following are your options:\n\t init \n\t inc \n\t releases');
            break;
    }
};

module.exports.cli = cli;

let { Versioner } = require("./Versioner");
let { VersionModel } = require('./Models');
let { checkIfBranchExists, createBranch, isEmpty } = require('./custom-utils');

let verbose = false;
// reading & writing JSON
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/

function increment() {
    let versioner = new Versioner("versioner.json", 'development');
    versioner.env.increment();
    versioner.update();
    if (verbose) {    
        console.log(versioner.data);
        console.log(versioner.version());
        console.log(versioner.release);
    }
}

function newProject() {
    program
        .option('-p, --project <p>', 'Name of your project')
        .parse(process.argv);        

    let { project } = program;    
    
    if (!project) {
        program.help((help) => colors.red('\nmissing required arguments!\n\n') + help);
        return;
    }

    Versioner.init(project);    
}

function createReleaseBranches() {
    let { release, data } = new Versioner("versioner.json", 'development');
    let { project } = data;
    
    let patch = new VersionModel(release);
    patch.patch++;
    let minor = new VersionModel(release);
    minor.minor++;
    let major = new VersionModel(release);
    major.major++;

    let releases = [patch.ToString(), minor.ToString(), major.ToString()];
    releases.forEach((v, i, e) => {
        let releaseBranch = isEmpty(project) ? `release/${v}` : `release/${project}/${v}`;
        checkIfBranchExists(
            releaseBranch,
            () => console.log(`${releaseBranch} already exists`),
            () => {
                createBranch(
                    releaseBranch,
                    () => console.log(`${releaseBranch} was created`)
                );
            }
        );
    });
}