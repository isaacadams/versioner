import fs from 'fs';
import { EnvironmentManager, EnvironmentModel } from './Environment';
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

    constructor(pathToJson, envToLoad) {
        this.path = pathToJson;
        
        let data = readJson(pathToJson);
        this.data = new VersionerModel(data, `file was null or empty at ${pathToJson}`);
        this.release = new VersionModel(this.data.release, "release is not in the correct format");
        this.env = new EnvironmentManager(this.data.environment, envToLoad);
    }
    
    update() {
        let serialized = JSON.stringify(this.data, null, 2);
        fs.writeFileSync(this.path, serialized);

        if(false) {
            console.log('updating data:');
            console.log(serialized);
        }
    }
    
    version() {
        return `${this.release.ToString()}-${this.env.config.suffix}.${this.env.config.build}`;
    }
}

function readJson(path) {
    let contents = fs.readFileSync(path);
    let obj = JSON.parse(contents);
    return obj;
}