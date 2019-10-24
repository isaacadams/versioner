"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.define = define;

var _commander = _interopRequireDefault(require("commander"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function define() {
  _commander["default"].command('init <project>').description('initialize versioner for your project').action(function (project, options) {
    //console.log(command, options);
    createVersionerJson(project, options);
  });
}

function createVersionerJson(name, options) {
  /* if (!project) {
      program.help((help) => colors.red('\nmissing required arguments!\n\n') + help);
      return;
  } */
  var initVersioner = {
    project: name,
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