"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWorkStop = void 0;
const work_1 = require("./work");
class CWorkStop extends work_1.CWork {
    constructor(name) {
        super(name);
        this.inputs = 1;
        this.outputs = 0;
    }
    run() {
        console.log("stopping");
    }
}
exports.CWorkStop = CWorkStop;
