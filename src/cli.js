import program from 'commander';
import colors from 'colors';

import { Versioner } from './Versioner';
import { VersionModel } from './Models';
import { checkIfBranchExists, createBranch, isEmpty } from './custom-utils';

let verbose = false;
// reading & writing JSON
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/

export function increment() {
    let versioner = new Versioner("versioner.json", 'development');
    versioner.env.increment();
    versioner.update();
    if (verbose) {    
        console.log(versioner.data);
        console.log(versioner.version());
        console.log(versioner.release);
    }
}

export function newProject(project) {

    if (!project) {
        program.help((help) => colors.red('\nmissing required arguments!\n\n') + help);
        return;
    }

    Versioner.init(project);    
}

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