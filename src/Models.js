import { isObjectEmpty } from './custom-utils';

export class JsonModel {
    constructor(data, error) {
        let empty = isObjectEmpty(data);
        
        if (!empty)
            return;

        console.log(error);
        process.exit(100);
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
        this.environments = data.environments;
    }
}