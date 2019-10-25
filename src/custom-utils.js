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

export function execute(executable, opts, success, err, verbose = false) {
    let thereWasAnError = false;
    let errorMessage = "";
    let commandData;
    let command = spawn(executable, opts);

    command.stdout.on('data', (data) => {
        commandData = data;        
    });

    command.stderr.on('data', d => {
        errorMessage = d;
        let errTemplate = `ERROR running executable:
        $ ${executable} ${opts.join(' ')}
        --------
        ${d}
        --------`;
        
        if(verbose)
            console.log(errTemplate);
        
        thereWasAnError = true;
    });

    command.on('close', (code) => {
        
        if (thereWasAnError || code < 0) {
            let m = errorMessage.toString('utf8');
            // remove the \r and \n from error message
            m = m.replace(/\r?\n|\r/g, "");

            err(m);
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

export function stringify(data) {
    if (data === null)
        return "";

    let t = typeof data;

    switch (t) {
        case "object":
            return JSON.stringify(data);

        case "string":
            return data;

        case "number":
            return `${data}`;

        case "buffer":
            return data.toString();

        default:
        case "undefined":
            return "";
    }
}

export function printOutSystemEnvVars() {
    Object.keys(process.env).forEach(k => {
        console.log(`${k}: ${process.env[k]}`);
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