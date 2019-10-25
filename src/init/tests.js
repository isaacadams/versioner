let { chai, versioner, mochaPromise, __root } = require('./../../testing/testing.shared');
let { expect, assert } = require('chai');

import fs from 'fs';
import { createVersionerJson } from './cli';

it('should say missing required argument <project>', function(done) {
    let p = versioner("init", []);

    mochaPromise(p, (o) => {
        //console.log(o);
        assert.propertyVal(o, 'stderr', "error: missing required argument 'project'\n");
        done();
    });
});


it('should create a file name "versioner.json"', function() {
    let p = createVersionerJson('myNewProject', []);
    assert.isTrue(fs.existsSync(p));
});