"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var r = require,
    assert = r('assert'),
    path = r('path'),
    _r = r('./../../dist/custom-utils'),
    execute = _r.execute;

__root = path.resolve(__dirname + './../../');

function versioner(_x) {
  return _versioner.apply(this, arguments);
}

function _versioner() {
  _versioner = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(command) {
    var opts,
        onsuccess,
        onfailure,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            opts = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
            onsuccess = _args.length > 2 ? _args[2] : undefined;
            onfailure = _args.length > 3 ? _args[3] : undefined;
            _context.next = 5;
            return execute("node", [__root + "/bin/versioner.js", command].concat(_toConsumableArray(opts)), onsuccess, onfailure);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _versioner.apply(this, arguments);
}

describe("init", function () {
  //let a = 1;
  it('should say missing required argument "project"', function () {
    //assert.equal([1, 2, 3].indexOf(4), -1);
    versioner("init something", [], function () {
      assert.equal(-1, 1); //throw new Error('versioner init should not succeed without a project name passed into it')
    }, function (e) {
      return assert.equal(e, "error: missing required argument 'project'");
    });
  });
});