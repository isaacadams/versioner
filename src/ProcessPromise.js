import { spawn } from 'child_process';

export function execute(executable, opts = [], verbose = false) { 
    
    let errors = [],
        data = [];

    let process = spawn(executable, opts);

    return new Promise(function (resolve, reject) {
        process.stdout.on('data', d => collectData(data, d));
        process.stderr.on('data', d => collectData(errors, d));

        //process.addListener("error", reject);

        /*
            So, if you are only interested in the process termination 
            (e.g. because the process holds an exclusive resource), 
            listening for "exit" is sufficient. 
            If you don't care about the program, 
            and only about its input and/or output, use the "close" event. 
        */
        // do close if you want to know when the process out stream is killed
        process.addListener("close", exitOrClose);
        // do exit if you want to know when the process was been killed
        //process.addListener("exit", exitOrClose);        

        function exitOrClose(code){
            //console.log('resolving ...');
            resolve(resolutionData(code));
        }

        function error(){
            let error = errors.join('\n::\t');
            
            let errTemplate = `ERROR running executable:
            $ ${executable} ${opts.join(' ')}
            --------
            ${error}
            --------`;
            
            if(verbose) console.log(errTemplate);
            
            console.log(error);
            return error;
        }

        function collectData(collection, d) {
            collection.push(d);
            console.log('collecting some data');
        }

        function resolutionData(code){
            let out = data.join(' ');
            let error = errors.length < 1 ? "" : errors.map(s => s.toString('utf8')).join('\n::\t');

            return {
                exitCode: code,
                stdout: out,
                stderr: error
            };
        }
    });
}

function cleanMessage(m){
    // remove the \r and \n from error message
    m = m.replace(/\r?\n|\r/g, "");
    return m;
}