let r = require,
path = r('path'),
chai = r('chai'),
chaiAsPromised = r('chai-as-promised'),
{ execute } = r('./../dist/ProcessPromise'),
__root = path.resolve(__dirname + './../');
  
chai.use(chaiAsPromised);  

function versioner(command, opts = []) {
    return execute(
        "node",
        [__root + "/bin/versioner.js", command, ...opts]
    );
}

function mochaPromise(p, cb) {
    p.then((o) => {
        setTimeout(function() {
            cb(o);
        });
    });
}

module.exports = {
    chai: chai,
    versioner: versioner,
    mochaPromise: mochaPromise,
    __root: __root
}