"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var r = require,
    path = r('path'),
    _r = r('./../../dist/ProcessPromise'),
    execute = _r.execute;

__root = path.resolve(__dirname + './../../');

var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');

var expect = chai.expect,
    assert = chai.assert;
chai.use(chaiAsPromised);

function versioner(command) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return execute("node", [__root + "/bin/versioner.js", command].concat(_toConsumableArray(opts)));
}

describe("init", function () {
  it('should say missing required argument <project>', function (done) {
    var p = versioner("init", []);
    p.then(function (o) {
      setTimeout(function () {
        //console.log(o);
        assert.propertyVal(o, 'stderr', "error: missing required argument 'project'\n");
        done();
      });
    });
  });
});