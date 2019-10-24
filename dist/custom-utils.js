"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIfBranchExists = checkIfBranchExists;
exports.createBranch = createBranch;
exports.execute = execute;
exports.isEmpty = isEmpty;
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
  var thereWasAnError = false;
  var commandData;
  var command = (0, _child_process.spawn)(executable, opts);
  command.stdout.on('data', function (data) {
    commandData = data;
  });
  command.stderr.on('data', function (d) {
    console.log("error running ".concat(executable, " ").concat(opts.join(' '), ":"));
    console.log(JSON.parse(d));
    thereWasAnError = true;
  });
  command.on('close', function (code) {
    if (thereWasAnError || code < 0) {
      console.log(code);
      err();
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

function printOutSystemEnvVars() {
  Object.keys(process.env).forEach(function (k) {
    console.log("".concat(k, ": ").concat(process.env[k]));
  });
}