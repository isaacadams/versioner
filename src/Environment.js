export class Environment {
    constructor(name, data) {
        this.name = name;
        this.data = data;
    }
    increment() {
        this.data.build++;
    }
}