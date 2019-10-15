let { Versioner } = require("./Versioner");
let { VersionModel } = require('./Models');
let { checkIfBranchExists, createBranch, isEmpty } = require('./custom-utils');

let verbose = false;
// reading & writing JSON
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/

let project = findArgument('--newProject');

if (project) {
    newProject(project);
}

let increment = findFlag('--i');

if (increment > -1) {
    let versioner = new Versioner("versioner.json", 'development');
    versioner.env.increment();
    versioner.update();
    if (verbose) {    
        console.log(versioner.data);
        console.log(versioner.version());
        console.log(versioner.release);
    }
}

let releases = findFlag('--releases');

if (releases > -1) {
    let versioner = new Versioner("versioner.json", 'development');
    createReleaseBranches(versioner.release, versioner.data.project);
}

function newProject(name) {
    Versioner.init(name);    
}

function createReleaseBranches(version, projectname) {
    let patch = new VersionModel(version);
    patch.patch++;
    let minor = new VersionModel(version);
    minor.minor++;
    let major = new VersionModel(version);
    major.major++;

    let releases = [patch.ToString(), minor.ToString(), major.ToString()];
    releases.forEach((v, i, e) => {
        let releaseBranch = isEmpty(projectname) ? `release/${v}` : `release/${projectname}/${v}`;
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

function findArgument(argName) {
    let i = findFlag(argName);
    let arg = process.argv[i + 1];
    return arg;
}

function findFlag(argName) {
    let i = process.argv.findIndex((v, i, o) => v === argName);

    if (i < 0)
        return undefined;

    return i;
}