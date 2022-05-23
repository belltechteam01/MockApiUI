"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWorkStart = void 0;
const work_1 = require("./work");
class CWorkStart extends work_1.CWork {
    constructor(name) {
        super(name);
        this.inputs = 0;
        this.outputs = 1;
    }
    run() {
        console.log("starting");
    }
}
exports.CWorkStart = CWorkStart;
