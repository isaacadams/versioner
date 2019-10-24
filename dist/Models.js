"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VersionerModel = exports.VersionModel = exports.EnvironmentModel = exports.EnvironmentConfigModel = exports.JsonModel = void 0;

var _customUtils = require("./custom-utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonModel = function JsonModel(data, error) {
  _classCallCheck(this, JsonModel);

  var empty = (0, _customUtils.isEmpty)(data);
  if (!empty) return;
  console.log(error);
  process.exit(100);
};

exports.JsonModel = JsonModel;

var EnvironmentConfigModel = function EnvironmentConfigModel(data) {
  _classCallCheck(this, EnvironmentConfigModel);

  this.suffix = data.suffix;
  this.build = data.build;
};

exports.EnvironmentConfigModel = EnvironmentConfigModel;

var EnvironmentModel = function EnvironmentModel(data) {
  _classCallCheck(this, EnvironmentModel);

  this.current = data.current;
  this.configurations = data.configurations;
};

exports.EnvironmentModel = EnvironmentModel;

var VersionModel =
/*#__PURE__*/
function (_JsonModel) {
  _inherits(VersionModel, _JsonModel);

  function VersionModel(data, error) {
    var _this;

    _classCallCheck(this, VersionModel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VersionModel).call(this, data, error));
    _this.major = data.major;
    _this.minor = data.minor;
    _this.patch = data.patch;
    return _this;
  }

  _createClass(VersionModel, [{
    key: "ToString",
    value: function ToString() {
      return "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch);
    }
  }]);

  return VersionModel;
}(JsonModel);

exports.VersionModel = VersionModel;

var VersionerModel =
/*#__PURE__*/
function (_JsonModel2) {
  _inherits(VersionerModel, _JsonModel2);

  function VersionerModel(data, error) {
    var _this2;

    _classCallCheck(this, VersionerModel);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(VersionerModel).call(this, data, error));
    _this2.project = data.project;
    _this2.release = data.release;
    _this2.environment = data.environment;
    return _this2;
  }

  return VersionerModel;
}(JsonModel);

exports.VersionerModel = VersionerModel;