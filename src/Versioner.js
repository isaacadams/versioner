import fs from 'fs';
import { EnvironmentManager, EnvironmentModel } from './Environment';
import { VersionerModel, VersionModel } from './Models';

export class Versioner {
    constructor(pathToJson, envToLoad) {
        this.path = pathToJson;
        
        let data = readJson(pathToJson);
        this.data = new VersionerModel(data, `file was null or empty at ${pathToJson}`);
        this.env = new EnvironmentManager(this.data.environment, envToLoad);
    }

    get release(){
        return new VersionModel(this.data.release, "release is not in the correct format");
    }

    build() {
        this.env.increment();
    }

    patch() {
        this.data.release.patch++;
    }
    
    minor() {
        this.data.release.minor++;
    }

    major() {
        this.data.release.major++;
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