"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.define = define;

var _commander = _interopRequireDefault(require("commander"));

var _Versioner = require("./../Versioner");

var _Models = require("./../Models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function define() {
  _commander["default"].command('bump <part>').description('bump a part [patch, minor, or major] in the version').option('-u --update', 'update the bumped version').action(function (part, options) {
    console.log(options.update);
    version(part, options);
  });
}

function version(part, opts) {
  var versioner = new _Versioner.Versioner("versioner.json", 'development');
  console.log(versioner.data.release);
  var bump = {
    build: function build() {
      return versioner.build();
    },
    patch: function patch() {
      return versioner.patch();
    },
    minor: function minor() {
      return versioner.minor();
    },
    major: function major() {
      return versioner.major();
    }
  };
  bump[part]();

  if (opts.update) {
    versioner.update();
  }

  var v = versioner.release.ToString();
  console.log("".concat(v, "-").concat(versioner.env.config.suffix, ".").concat(versioner.env.config.build));
}