"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWorkWait = void 0;
const work_1 = require("./work");
class CWorkWait extends work_1.CWork {
    constructor(name) {
        super(name);
        this.inputs = 1;
        this.outputs = 1;
    }
    run() {
        console.log("Wait running");
    }
}
exports.CWorkWait = CWorkWait;
