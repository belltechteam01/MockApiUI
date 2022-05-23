"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWorkSplit = void 0;
const work_1 = require("./work");
class CWorkSplit extends work_1.CWork {
    constructor(name) {
        super(name);
        this.inputs = 1;
        this.outputs = 2;
    }
    run() {
        console.log("Split running");
    }
}
exports.CWorkSplit = CWorkSplit;
