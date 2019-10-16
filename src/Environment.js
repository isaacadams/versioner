import { EnvironmentModel, EnvironmentConfigModel } from './Models';

export class EnvironmentManager {
    constructor(data, envToLoad) {
        this.data = new EnvironmentModel(data);
        this.name = envToLoad;
        
        let nameDoesNotExist = !this.data.configurations.hasOwnProperty(envToLoad);
        
        if (nameDoesNotExist) {
            console.log(`${envToLoad} is not supported`);
            process.exit(100);
        }
        
        let config = this.data.configurations[envToLoad];
        this.config = new EnvironmentConfigModel(config);
    }
    increment() {
        this.config.build++;
    }
}