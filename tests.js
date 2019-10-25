function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe("versioner", function () {
    beforeEach(function () {
       //console.log("running something before each test");
    });
    
    importTest("init", './src/init/tests.js');
    //importTest("b", './b/b');
    
    after(function () {
        //console.log("after all tests");
    });
});