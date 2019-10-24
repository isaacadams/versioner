#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

var _Versioner = require("./../Versioner");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function main(project) {
  /* if (!project) {
      program.help((help) => colors.red('\nmissing required arguments!\n\n') + help);
      return;
  } */
  var initVersioner = {
    project: project,
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
  var serialized = JSON.stringify(initVersioner, null, 2);

  _fs["default"].writeFileSync("versioner.json", serialized);
}