"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWorkAction = void 0;
const work_1 = require("./work");
class CWorkAction extends work_1.CWork {
    constructor(name) {
        super(name);
        this.inputs = 1;
        this.outputs = 1;
    }
    run() {
        console.log("Action running");
    }
}
exports.CWorkAction = CWorkAction;
