"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWorkCallApi = void 0;
const work_1 = require("./work");
class CWorkCallApi extends work_1.CWork {
    constructor(name) {
        super(name);
        this.inputs = 1;
        this.outputs = 1;
    }
    run() {
        console.log("CallApi running");
    }
}
exports.CWorkCallApi = CWorkCallApi;
