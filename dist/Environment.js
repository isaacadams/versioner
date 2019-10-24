"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvironmentManager = void 0;

var _Models = require("./Models");

var _Models2 = require("../dist/Models");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EnvironmentManager =
/*#__PURE__*/
function () {
  function EnvironmentManager(data, envToLoad) {
    _classCallCheck(this, EnvironmentManager);

    this.data = new _Models.EnvironmentModel(data);
    this.name = envToLoad;
    var nameDoesNotExist = !this.data.configurations.hasOwnProperty(envToLoad);

    if (nameDoesNotExist) {
      console.log("".concat(envToLoad, " is not supported"));
      process.exit(100);
    }
  }

  _createClass(EnvironmentManager, [{
    key: "increment",
    value: function increment() {
      var c = this.config;
      c.build++;
      this.config = c;
    }
  }, {
    key: "config",
    get: function get() {
      var d = this.data.configurations[this.name];
      return new _Models.EnvironmentConfigModel(d);
    },
    set: function set(value) {
      this.data.configurations[this.name] = value;
    }
  }]);

  return EnvironmentManager;
}();

exports.EnvironmentManager = EnvironmentManager;