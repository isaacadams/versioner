import { isEmpty } from './custom-utils';

export class JsonModel {
    constructor(data, error) {
        let empty = isEmpty(data);
        
        if (!empty)
            return;

        console.log(error);
        process.exit(100);
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

export class VersionModel extends JsonModel {
    constructor(data, error) {
        super(data, error);

        this.major = data.major;
        this.minor = data.minor;
        this.patch = data.patch;
    }

    ToString() {
        return `${this.major}.${this.minor}.${this.patch}`;
    }
}

export class VersionerModel extends JsonModel {
    constructor(data, error) {
        super(data, error);

        this.project = data.project;
        this.release = data.release;
        this.environment = data.environment;
    }
}