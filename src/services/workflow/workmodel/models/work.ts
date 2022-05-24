export abstract class CWork{
    id: string;
    name: string
    public abstract readonly inputs: number;
    public abstract readonly outputs: number;

    constructor(name: string) {
        this.id = "undefined";
        this.name = name;
    }

    run() {
        console.log("Work base running");
    }
}
