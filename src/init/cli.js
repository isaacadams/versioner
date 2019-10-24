#!/usr/bin/env node
import { Versioner } from './../Versioner';
import fs from 'fs';

export function main(project) {

    /* if (!project) {
        program.help((help) => colors.red('\nmissing required arguments!\n\n') + help);
        return;
    } */

    let initVersioner = {
        project: project,
        release: {
            major: 0,
            minor: 0,
            patch: 0
        },
        environment: {
            current: "development",
            configurations: {
                development: {
                    suffix: "dev",
                    build: 0
                }
            }
        }
    };
    let serialized = JSON.stringify(initVersioner, null, 2);
    fs.writeFileSync("versioner.json", serialized);
}