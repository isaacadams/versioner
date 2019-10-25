import program from 'commander';

export function define(){
    program
        .command('init <project>')
        .description('initialize versioner for your project')
        .action((project, options) => {
            //console.log(command, options);
            createVersionerJson(project, options);
        });
}

import fs from 'fs';
import path from 'path';

export function createVersionerJson(name, options) {

    /* if (!project) {
        program.help((help) => colors.red('\nmissing required arguments!\n\n') + help);
        return;
    } */

    let initVersioner = {
        project: name,
        release: {
            major: 0,
            minor: 0,
            patch: 0
        },
        environment: {
            current: "development",
            configurations: {
                development: {
                    suffix: "dev",
                    build: 0
                }
            }
        }
    };
    let serialized = JSON.stringify(initVersioner, null, 2);
    
    let fileName = "versioner.json";
    fs.writeFileSync(fileName, serialized);
    let pathToVersionerFile = path.resolve(fileName);
    return pathToVersionerFile;
}


import { Versioner } from './../Versioner';
import { VersionModel } from './../Models';
import { checkIfBranchExists, createBranch, isEmpty } from './../custom-utils';


let verbose = false;
// reading & writing JSON
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/

export function createReleaseBranches() {
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