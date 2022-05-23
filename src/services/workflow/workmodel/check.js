"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWorkCheck = void 0;
const work_1 = require("./work");
class CWorkCheck extends work_1.CWork {
    constructor(name) {
        super(name);
        this.inputs = 1;
        this.outputs = 2;
    }
    run() {
        console.log("Check running");
    }
}
exports.CWorkCheck = CWorkCheck;
