"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workflow = exports.ProcessStart = exports.ProcessStop = exports.ProcessCheck = exports.ProcessWait = exports.WorkSplit = exports.WorkMerge = exports.CallRule = exports.CallApi = exports.Action = exports.WorkBase = exports.CWorkflow = void 0;
const work_1 = require("./workmodel/work");
Object.defineProperty(exports, "WorkBase", { enumerable: true, get: function () { return work_1.CWork; } });
const action_1 = require("./workmodel/action");
Object.defineProperty(exports, "Action", { enumerable: true, get: function () { return action_1.CWorkAction; } });
const callapi_1 = require("./workmodel/callapi");
Object.defineProperty(exports, "CallApi", { enumerable: true, get: function () { return callapi_1.CWorkCallApi; } });
const callrule_1 = require("./workmodel/callrule");
Object.defineProperty(exports, "CallRule", { enumerable: true, get: function () { return callrule_1.CWorkCallRule; } });
const merge_1 = require("./workmodel/merge");
Object.defineProperty(exports, "WorkMerge", { enumerable: true, get: function () { return merge_1.CWorkMerge; } });
const split_1 = require("./workmodel/split");
Object.defineProperty(exports, "WorkSplit", { enumerable: true, get: function () { return split_1.CWorkSplit; } });
const wait_1 = require("./workmodel/wait");
Object.defineProperty(exports, "ProcessWait", { enumerable: true, get: function () { return wait_1.CWorkWait; } });
const check_1 = require("./workmodel/check");
Object.defineProperty(exports, "ProcessCheck", { enumerable: true, get: function () { return check_1.CWorkCheck; } });
const stop_1 = require("./workmodel/stop");
Object.defineProperty(exports, "ProcessStop", { enumerable: true, get: function () { return stop_1.CWorkStop; } });
const start_1 = require("./workmodel/start");
Object.defineProperty(exports, "ProcessStart", { enumerable: true, get: function () { return start_1.CWorkStart; } });
const workmap_1 = require("./workmap");
const worknode_1 = require("./workmap/worknode");
const settings_1 = require("./settings");
class CWorkflow {
    constructor(name) {
        this.id = "123";
        this.type = "COLLECTION";
        this.id = settings_1.WorkflowSettings.WORKFLOW_ID_DEFAULT;
        this.name = name !== null && name !== void 0 ? name : settings_1.WorkflowSettings.WORKFLOW_NAME_DEFAULT;
        this.worklist = new workmap_1.CWorkMap();
    }
    add(model, type) {
        let _type = type;
        if (!_type) {
            settings_1.WorkflowSettings.NODE_TYPE_DEFAULT;
            switch (model.constructor.name) {
                case "CWorkAction": {
                    _type = worknode_1.ENM_FLOWTYPE.I1_O0;
                    break;
                }
                case "CWorkCallApi": {
                    _type = worknode_1.ENM_FLOWTYPE.I0_O2;
                    break;
                }
                case "CWorkCallRule": {
                    _type = worknode_1.ENM_FLOWTYPE.I0_O1;
                    break;
                }
                case "CWorkWait": {
                    _type = worknode_1.ENM_FLOWTYPE.I1_O1;
                    break;
                }
                case "CWorkMerge": {
                    _type = worknode_1.ENM_FLOWTYPE.I2_O1;
                    break;
                }
                case "CWorkSplit": {
                    _type = worknode_1.ENM_FLOWTYPE.I1_O2;
                    break;
                }
                case "CWorkCheck": {
                    _type = worknode_1.ENM_FLOWTYPE.I1_O2;
                    break;
                }
                case "CWorkStart": {
                    _type = worknode_1.ENM_FLOWTYPE.I0_O1;
                    break;
                }
                case "CWorkEnd": {
                    _type = worknode_1.ENM_FLOWTYPE.I1_O0;
                    break;
                }
            }
        }
        this.worklist.append(model, _type);
    }
    moveTo(id) {
        console.log("workflow moveto");
        // const bMoved = this.worklist.moveToRoot();
        console.log(JSON.stringify(this.worklist.toArray));
    }
    excute() {
        console.log("workflow excute");
    }
}
exports.CWorkflow = CWorkflow;
exports.Workflow = CWorkflow;
