import program from 'commander';

export function define() {
    program
        .command('get')
        .description('Get the current version')
        .option('-u --update', 'update the version')
        .option('-b --bump <part>', 'bump a part of the version [patch, minor, or major]')
        .action((options) => {
            version(options);
        });
}

import { Versioner } from './../Versioner';

function version(opts) {
    let versioner = new Versioner("versioner.json", 'development');

    if(!!opts.bump) {
        let bump = {
            build: () => versioner.build(),
            patch: () => versioner.patch(),
            minor: () => versioner.minor(),
            major: () => versioner.major()
        };
    
        bump[opts.bump]();   
    }
    
    if(opts.update){
        versioner.update();
    }

    let v = versioner.release.ToString();
    console.log(`${v}-${versioner.env.config.suffix}.${versioner.env.config.build}`);
}