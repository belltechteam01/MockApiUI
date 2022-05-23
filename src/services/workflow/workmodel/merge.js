"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWorkMerge = void 0;
const work_1 = require("./work");
class CWorkMerge extends work_1.CWork {
    constructor(name) {
        super(name);
        this.inputs = 2;
        this.outputs = 1;
    }
    run() {
        console.log("Merge running");
    }
}
exports.CWorkMerge = CWorkMerge;
