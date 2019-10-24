import program from 'commander';

export function define(){
    program
        .command('bump <part>')
        .description('bump a part [patch, minor, or major] in the version')
        .option('-u --update', 'update the bumped version')
        .action((part, options) => {        
            
            version(part, options);
        });
}

import { Versioner } from './../Versioner';

function version(part, opts) {
    let versioner = new Versioner("versioner.json", 'development');

    let bump = {
        build: () => versioner.build(),
        patch: () => versioner.patch(),
        minor: () => versioner.minor(),
        major: () => versioner.major()
    };

    bump[part]();   
    
    if(opts.update){
        versioner.update();
    }

    let v = versioner.release.ToString();
    console.log(`${v}-${versioner.env.config.suffix}.${versioner.env.config.build}`);
}