let r = require,
    assert = r('assert'),
    path = r('path'),
    { execute } = r('./../../dist/custom-utils')
    __root = path.resolve(__dirname + './../../');


function versioner(command, opts = [], onsuccess, onfailure) {
    execute(
        "node",
        [__root + "/bin/versioner.js", command, ...opts],
        onsuccess,
        onfailure
    );
}

describe("init", function () {
    //let a = 1;
    it('should say missing required argument "project"', function() {
        //assert.equal([1, 2, 3].indexOf(4), -1);
        versioner(
            "init something", 
            [], 
            () => {
                assert.equal(-1, 1);
                //throw new Error('versioner init should not succeed without a project name passed into it')
            },
            (e) => assert.equal(e, "error: missing required argument 'project'")
        );        
    });
});