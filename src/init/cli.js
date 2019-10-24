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

function createVersionerJson(name, options) {

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
    fs.writeFileSync("versioner.json", serialized);
}