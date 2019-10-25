let { chai, versioner, mochaPromise, __root } = require('./../../testing/testing.shared');
let { expect, assert } = chai;

it('should say missing required argument <project>', function(done) {
    let p = versioner("init", []);
    
    mochaPromise(p, (o) => {
        //console.log(o);
        assert.propertyVal(o, 'stderr', "error: missing required argument 'project'\n");
        done();
    });
});