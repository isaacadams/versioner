"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;
exports.createReleaseBranches = createReleaseBranches;

var _commander = _interopRequireDefault(require("commander"));

var _colors = _interopRequireDefault(require("colors"));

var init = _interopRequireWildcard(require("./init/cli"));

var version = _interopRequireWildcard(require("./version/cli"));

var _Versioner = require("./Versioner");

var _Models = require("./Models");

var _customUtils = require("./custom-utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function main() {
  init.define();
  version.define();
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