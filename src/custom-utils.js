import { spawn } from 'child_process';

export function checkIfBranchExists(name, ifFoundCallback, notFoundCallback) {
    execute(
        'git',
        ['branch', '--list', name],
        d => {
            if (d) {
                ifFoundCallback();
                return;
            }

            notFoundCallback();
        },
        () => console.log(`something went wrong when looking for ${name}`)
    );
}

export function createBranch(name, success) {
    execute(
        'git',
        ['branch', name],
        success,
        () => console.log(`was unable to create ${name}`)
    );
}

export function execute(executable, opts, success, err) {
    let thereWasAnError = false;
    let commandData;
    let command = spawn(executable, opts);

    command.stdout.on('data', (data) => {
        commandData = data;        
    });

    command.stderr.on('data', d => {
        console.log(`error running ${executable} ${opts.join(' ')}:`);
        console.log(JSON.parse(d));
        thereWasAnError = true;
    });

    command.on('close', (code) => {
        
        if (thereWasAnError || code < 0) {
            console.log(code);
            err();
            return;
        }

        success(commandData);
    });
}

export function isEmpty(data) {
    if (data === null)
        return true;

    let t = typeof data;

    switch (t) {
        default:
        case "undefined":
            return true;

        case "object":
            return Object.keys(data).length === 0;

        case "string":
            return data.length === 0;
    }
}

export function printOutSystemEnvVars() {
    Object.keys(process.env).forEach(k => {
        console.log(`${k}: ${process.env[k]}`);
    });
}