"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increment = increment;
exports.version = version;
exports.createReleaseBranches = createReleaseBranches;

var _commander = _interopRequireDefault(require("commander"));

var _colors = _interopRequireDefault(require("colors"));

var _Versioner = require("./Versioner");

var _Models = require("./Models");

var _customUtils = require("./custom-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verbose = false; // reading & writing JSON
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/

function increment() {
  var versioner = new _Versioner.Versioner("versioner.json", 'development');
  versioner.env.increment();
  versioner.update();

  if (verbose) {
    console.log(versioner.data);
    console.log(versioner.version());
    console.log(versioner.release);
  }
}

function version(part, cmdObj) {
  var versioner = new _Versioner.Versioner("versioner.json", 'development');
  var release = versioner.release;
  var version = new _Models.VersionModel(release);
  var bump = {
    build: build,
    patch: patch,
    minor: minor,
    major: major
  }; //let bumper = bump[part];
  //console.log(bumper);

  bump[part]();
  var v = version.ToString();

  if (cmdObj.update) {
    versioner.update();
  }

  console.log("".concat(v, "-").concat(versioner.env.config.suffix, ".").concat(versioner.env.config.build));

  function build() {
    versioner.env.increment();
  }

  function patch() {
    version.patch++;
  }

  function minor() {
    version.minor++;
  }

  function major() {
    version.major++;
  }
}

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