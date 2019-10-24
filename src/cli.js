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

export function version(part, cmdObj) {
    let versioner = new Versioner("versioner.json", 'development');
    let { release } = versioner;
    let version = new VersionModel(release);

    let bump = {
        build: build,
        patch: patch,
        minor: minor,
        major: major
    };

    //let bumper = bump[part];
    //console.log(bumper);
    bump[part]();

    let v = version.ToString();

    if(cmdObj.update){
        versioner.update();
    }

    console.log(`${v}-${versioner.env.config.suffix}.${versioner.env.config.build}`);

    function build() {
        versioner.env.increment();
    }

    function patch() {
        version.patch++;
    }
    
    function minor() {
        version.minor++;
    }

    function major() {
        version.major++;
    }
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