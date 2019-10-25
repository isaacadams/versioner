"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _cli = require("./cli");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('./../../testing/testing.shared'),
    chai = _require.chai,
    versioner = _require.versioner,
    mochaPromise = _require.mochaPromise,
    __root = _require.__root;

var _require2 = require('chai'),
    expect = _require2.expect,
    assert = _require2.assert;

it('should say missing required argument <project>', function (done) {
  var p = versioner("init", []);
  mochaPromise(p, function (o) {
    //console.log(o);
    assert.propertyVal(o, 'stderr', "error: missing required argument 'project'\n");
    done();
  });
});
it('should create a file name "versioner.json"', function () {
  var p = (0, _cli.createVersionerJson)('myNewProject', []);
  assert.isTrue(_fs["default"].existsSync(p));
});