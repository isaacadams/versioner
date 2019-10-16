import fs from 'fs';
import { Environment } from './Environment';
import { VersionerModel, VersionModel } from './Models';

export class Versioner {
    static init(name) {
        let initVersioner = {
            project: name,
            release: {
                major: 0,
                minor: 0,
                patch: 0
            },
            environments: {
                development: {
                    suffix: "dev",
                    build: 0
                }
            }
        };
        let serialized = JSON.stringify(initVersioner, null, 2);
        fs.writeFileSync("versioner.json", serialized);
    }

    constructor(pathToJson, environment) {
        this.path = pathToJson;
        
        let data = readJson(pathToJson);
        this.data = new VersionerModel(data, `file was null or empty at ${pathToJson}`);
        this.release = new VersionModel(this.data.release, "release is not in the correct format");
        this.env = loadEnvironment(this.data.environments, environment);
    }
    
    update() {
        let serialized = JSON.stringify(this.data, null, 2);
        fs.writeFileSync(this.path, serialized);
    }
    
    version() {
        return `${this.release.ToString()}-${this.env.data.suffix}.${this.env.data.build}`;
    }
}

function readJson(path) {
    let contents = fs.readFileSync(path);
    let obj = JSON.parse(contents);
    return obj;
}

function loadEnvironment(environments, name) {
    let nameDoesNotExist = !environments.hasOwnProperty(name);

    if (nameDoesNotExist) {
        console.log(`${name} is not supported`);
        process.exit(100);
    }

    let e = environments[name];
    return new Environment(name, e);
}