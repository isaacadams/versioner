import program from 'commander';
import colors from 'colors';

import * as init from './init/cli';
import * as version from './version/cli';

export function main() {
    init.define();
    version.define();
}

import { Versioner } from './Versioner';
import { VersionModel } from './Models';
import { checkIfBranchExists, createBranch, isEmpty } from './custom-utils';


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