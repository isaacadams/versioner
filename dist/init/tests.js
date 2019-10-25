"use strict";

var _require = require('./../../testing/testing.shared'),
    chai = _require.chai,
    versioner = _require.versioner,
    mochaPromise = _require.mochaPromise,
    __root = _require.__root;

var expect = chai.expect,
    assert = chai.assert;
it('should say missing required argument <project>', function (done) {
  var p = versioner("init something", []);
  mochaPromise(p, function (o) {
    //console.log(o);
    assert.propertyVal(o, 'stderr', "error: missing required argument 'project'\n");
    done();
  });
});