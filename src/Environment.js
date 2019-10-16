import { EnvironmentModel, EnvironmentConfigModel } from './Models';
import { JsonModel } from '../dist/Models';

export class EnvironmentManager {
    constructor(data, envToLoad) {
        this.data = new EnvironmentModel(data);
        this.name = envToLoad;
        
        let nameDoesNotExist = !this.data.configurations.hasOwnProperty(envToLoad);
        
        if (nameDoesNotExist) {
            console.log(`${envToLoad} is not supported`);
            process.exit(100);
        }        
    }
    increment() {
        let c = this.config;
        c.build++;
        this.config = c;
    }

    get config(){
        let d = this.data.configurations[this.name];
        return new EnvironmentConfigModel(d);
    }

    set config(value) {
        this.data.configurations[this.name] = value;
    }
}