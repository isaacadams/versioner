/* import program from 'commander';
import colors from 'colors'; */

import * as init from './init/cli';
import * as version from './version/cli';

export function main() {
    init.define();
    version.define();
}