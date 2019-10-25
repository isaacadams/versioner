"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.define = define;
exports.createVersionerJson = createVersionerJson;
exports.createReleaseBranches = createReleaseBranches;

var _commander = _interopRequireDefault(require("commander"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _Versioner = require("./../Versioner");

var _Models = require("./../Models");

var _customUtils = require("./../custom-utils");

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
  var fileName = "versioner.json";

  _fs["default"].writeFileSync(fileName, serialized);

  var pathToVersionerFile = _path["default"].resolve(fileName);

  return pathToVersionerFile;
}

var verbose = false; // reading & writing JSON
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/

function createReleaseBranches() {
  var _ref = new _Versioner.Versioner("versioner.json", 'development'),
      release = _ref.release,
      data = _ref.data;

  var project = data.project;
  var patch = new _Models.VersionModel(release);
  patch.patch++;
  var minor = new _Models.VersionModel(release);
  minor.minor++;
  var major = new _Models.VersionModel(release);
  major.major++;
  var releases = [patch.ToString(), minor.ToString(), major.ToString()];
  releases.forEach(function (v, i, e) {
    var releaseBranch = (0, _customUtils.isEmpty)(project) ? "release/".concat(v) : "release/".concat(project, "/").concat(v);
    (0, _customUtils.checkIfBranchExists)(releaseBranch, function () {
      return console.log("".concat(releaseBranch, " already exists"));
    }, function () {
      (0, _customUtils.createBranch)(releaseBranch, function () {
        return console.log("".concat(releaseBranch, " was created"));
      });
    });
  });
}