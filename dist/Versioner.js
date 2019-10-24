"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Versioner = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _Environment = require("./Environment");

var _Models = require("./Models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Versioner =
/*#__PURE__*/
function () {
  function Versioner(pathToJson, envToLoad) {
    _classCallCheck(this, Versioner);

    this.path = pathToJson;
    var data = readJson(pathToJson);
    this.data = new _Models.VersionerModel(data, "file was null or empty at ".concat(pathToJson));
    this.env = new _Environment.EnvironmentManager(this.data.environment, envToLoad);
  }

  _createClass(Versioner, [{
    key: "build",
    value: function build() {
      this.env.increment();
    }
  }, {
    key: "patch",
    value: function patch() {
      this.data.release.patch++;
    }
  }, {
    key: "minor",
    value: function minor() {
      this.data.release.minor++;
    }
  }, {
    key: "major",
    value: function major() {
      this.data.release.major++;
    }
  }, {
    key: "update",
    value: function update() {
      var serialized = JSON.stringify(this.data, null, 2);

      _fs["default"].writeFileSync(this.path, serialized);

      if (true) {
        console.log('updating data:');
        console.log(serialized);
      }
    }
  }, {
    key: "version",
    value: function version() {
      return "".concat(this.release.ToString(), "-").concat(this.env.config.suffix, ".").concat(this.env.config.build);
    }
  }, {
    key: "release",
    get: function get() {
      return new _Models.VersionModel(this.data.release, "release is not in the correct format");
    }
  }]);

  return Versioner;
}();

exports.Versioner = Versioner;

function readJson(path) {
  var contents = _fs["default"].readFileSync(path);

  var obj = JSON.parse(contents);
  return obj;
}