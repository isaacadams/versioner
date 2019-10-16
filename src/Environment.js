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
        this.data.build++;
    }
}

export class EnvironmentConfigModel {
    constructor(data) {
        this.suffix = data.suffix;
        this.build = data.build;
    }
}

export class EnvironmentModel {
    constructor(data) {
        this.current = data.current;
        this.configurations = data.configurations;
    }
}