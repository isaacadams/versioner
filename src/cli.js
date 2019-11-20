/* import program from 'commander';
import colors from 'colors'; */

import * as init from './init/cli';
import * as get from './get/cli';

export function main() {
    init.define();
    get.define();
}