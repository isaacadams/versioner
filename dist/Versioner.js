/* 
        NOTICE NOTICE NOTICE 
                         
        THIS IS AN AUTOMATICALLY GENERATED FILE BY GULP
        DO NOT EDIT THIS FILE DIRECTLY
        MAKE EDITS TO THE SAME FILE LOCATED IN THE 'SRC' FOLDER
    */

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require('fs');

var _require = require("./Environment"),
    Environment = _require.Environment;

var _require2 = require("./custom-utils"),
    isObjectEmpty = _require2.isObjectEmpty;

var _require3 = require("./Models"),
    VersionerModel = _require3.VersionerModel,
    VersionModel = _require3.VersionModel;

var Versioner =
/*#__PURE__*/
function () {
  _createClass(Versioner, null, [{
    key: "init",
    value: function init(name) {
      var initVersioner = {
        project: name,
        release: {
          major: 0,
          minor: 0,
          patch: 0
        },
        environments: {
          development: {
            suffix: "dev",
            build: 0
          }
        }
      };
      var serialized = JSON.stringify(initVersioner, null, 2);
      fs.writeFileSync("versioner.json", serialized);
    }
  }]);

  function Versioner(pathToJson, environment) {
    _classCallCheck(this, Versioner);

    this.path = pathToJson;
    var data = readJson(pathToJson);
    this.data = new VersionerModel(data, "file was null or empty at ".concat(pathToJson));
    this.release = new VersionModel(this.data.release, "release is not in the correct format");
    this.env = loadEnvironment(this.data.environments, environment);
  }

  _createClass(Versioner, [{
    key: "update",
    value: function update() {
      var serialized = JSON.stringify(this.data, null, 2);
      fs.writeFileSync(this.path, serialized);
    }
  }, {
    key: "version",
    value: function version() {
      return "".concat(this.release.ToString(), "-").concat(this.env.data.suffix, ".").concat(this.env.data.build);
    }
  }]);

  return Versioner;
}();

function readJson(path) {
  var contents = fs.readFileSync(path);
  var obj = JSON.parse(contents);
  return obj;
}

function loadEnvironment(environments, name) {
  var nameDoesNotExist = !environments.hasOwnProperty(name);

  if (nameDoesNotExist) {
    console.log("".concat(name, " is not supported"));
    process.exit(100);
  }

  var e = environments[name];
  return new Environment(name, e);
}

module.exports = {
  Versioner: Versioner
};