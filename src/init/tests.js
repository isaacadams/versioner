let r = require,
    //assert = r('assert'),
    path = r('path'),
    { execute } = r('./../../dist/ProcessPromise')
    __root = path.resolve(__dirname + './../../');

const chai = require('chai');  
const chaiAsPromised = require('chai-as-promised');  
  
const { expect, assert } = chai;  
chai.use(chaiAsPromised);  

function versioner(command, opts = []) {
    return execute(
        "node",
        [__root + "/bin/versioner.js", command, ...opts]
    );
}

describe("init", function () {
    it('should say missing required argument <project>', function(done) {
        let p = versioner("init", []);
        p.then((o) => {
            setTimeout(function() {
                //console.log(o);
                assert.propertyVal(o, 'stderr', "error: missing required argument 'project'\n");
                done();
            });
        });
    });
});