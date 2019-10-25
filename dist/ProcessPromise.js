"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = execute;

var _child_process = require("child_process");

function execute(executable) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var verbose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var errors = [],
      data = [];
  var process = (0, _child_process.spawn)(executable, opts);
  return new Promise(function (resolve, reject) {
    process.stdout.on('data', function (d) {
      return collectData(data, d);
    });
    process.stderr.on('data', function (d) {
      return collectData(errors, d);
    }); //process.addListener("error", reject);

    /*
        So, if you are only interested in the process termination 
        (e.g. because the process holds an exclusive resource), 
        listening for "exit" is sufficient. 
        If you don't care about the program, 
        and only about its input and/or output, use the "close" event. 
    */
    // do close if you want to know when the process out stream is killed

    process.addListener("close", exitOrClose); // do exit if you want to know when the process was been killed
    //process.addListener("exit", exitOrClose);        

    function exitOrClose(code) {
      //console.log('resolving ...');
      resolve(resolutionData(code));
    }

    function error() {
      var error = errors.join('\n::\t');
      var errTemplate = "ERROR running executable:\n            $ ".concat(executable, " ").concat(opts.join(' '), "\n            --------\n            ").concat(error, "\n            --------");
      if (verbose) console.log(errTemplate);
      console.log(error);
      return error;
    }

    function collectData(collection, d) {
      collection.push(d);
      console.log('collecting some data');
    }

    function resolutionData(code) {
      var out = data.join(' ');
      var error = errors.length < 1 ? "" : errors.map(function (s) {
        return s.toString('utf8');
      }).join('\n::\t');
      return {
        exitCode: code,
        stdout: out,
        stderr: error
      };
    }
  });
}

function cleanMessage(m) {
  // remove the \r and \n from error message
  m = m.replace(/\r?\n|\r/g, "");
  return m;
}