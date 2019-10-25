"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIfBranchExists = checkIfBranchExists;
exports.createBranch = createBranch;
exports.execute = execute;
exports.isEmpty = isEmpty;
exports.stringify = stringify;
exports.printOutSystemEnvVars = printOutSystemEnvVars;

var _child_process = require("child_process");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function checkIfBranchExists(name, ifFoundCallback, notFoundCallback) {
  execute('git', ['branch', '--list', name], function (d) {
    if (d) {
      ifFoundCallback();
      return;
    }

    notFoundCallback();
  }, function () {
    return console.log("something went wrong when looking for ".concat(name));
  });
}

function createBranch(name, success) {
  execute('git', ['branch', name], success, function () {
    return console.log("was unable to create ".concat(name));
  });
}

function execute(executable, opts, success, err) {
  var verbose = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var thereWasAnError = false;
  var errorMessage = "";
  var commandData;
  var command = (0, _child_process.spawn)(executable, opts);
  command.stdout.on('data', function (data) {
    commandData = data;
  });
  command.stderr.on('data', function (d) {
    errorMessage = d;
    var errTemplate = "ERROR running executable:\n        $ ".concat(executable, " ").concat(opts.join(' '), "\n        --------\n        ").concat(d, "\n        --------");
    if (verbose) console.log(errTemplate);
    thereWasAnError = true;
  });
  command.on('close', function (code) {
    if (thereWasAnError || code < 0) {
      var m = errorMessage.toString('utf8'); // remove the \r and \n from error message

      m = m.replace(/\r?\n|\r/g, "");
      err(m);
      return;
    }

    success(commandData);
  });
}

function isEmpty(data) {
  if (data === null) return true;

  var t = _typeof(data);

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

function stringify(data) {
  if (data === null) return "";

  var t = _typeof(data);

  switch (t) {
    case "object":
      return JSON.stringify(data);

    case "string":
      return data;

    case "number":
      return "".concat(data);

    case "buffer":
      return data.toString();

    default:
    case "undefined":
      return "";
  }
}

function printOutSystemEnvVars() {
  Object.keys(process.env).forEach(function (k) {
    console.log("".concat(k, ": ").concat(process.env[k]));
  });
}

function findArgument(argName) {
  var i = findFlag(argName);
  var arg = process.argv[i + 1];
  return arg;
}

function findFlag(argName) {
  var i = process.argv.findIndex(function (v, i, o) {
    return v === argName;
  });
  if (i < 0) return undefined;
  return i;
}