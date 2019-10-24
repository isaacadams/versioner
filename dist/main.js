"use strict";

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