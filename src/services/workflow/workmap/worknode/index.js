"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWorkNode = exports.ENM_EDIT_SUBSTATE = exports.ENM_RUN_SUBSTATE = exports.ENM_VALIDATE_SUBSTATE = exports.ENM_FLOW_STATE = exports.ENM_FLOWTYPE = void 0;
const events_1 = require("../../events");
const uuid_1 = require("uuid");
var ENM_FLOWTYPE;
(function (ENM_FLOWTYPE) {
    ENM_FLOWTYPE[ENM_FLOWTYPE["I0_O1"] = 0] = "I0_O1";
    ENM_FLOWTYPE[ENM_FLOWTYPE["I0_O2"] = 1] = "I0_O2";
    ENM_FLOWTYPE[ENM_FLOWTYPE["I1_O0"] = 2] = "I1_O0";
    ENM_FLOWTYPE[ENM_FLOWTYPE["I1_O1"] = 3] = "I1_O1";
    ENM_FLOWTYPE[ENM_FLOWTYPE["I1_O2"] = 4] = "I1_O2";
    ENM_FLOWTYPE[ENM_FLOWTYPE["I2_O1"] = 5] = "I2_O1";
})(ENM_FLOWTYPE = exports.ENM_FLOWTYPE || (exports.ENM_FLOWTYPE = {}));
var ENM_FLOW_STATE;
(function (ENM_FLOW_STATE) {
    ENM_FLOW_STATE[ENM_FLOW_STATE["INITIALIZING"] = 0] = "INITIALIZING";
    ENM_FLOW_STATE[ENM_FLOW_STATE["EDIT"] = 1] = "EDIT";
    ENM_FLOW_STATE[ENM_FLOW_STATE["VALIDATE"] = 2] = "VALIDATE";
    ENM_FLOW_STATE[ENM_FLOW_STATE["RUN"] = 3] = "RUN";
})(ENM_FLOW_STATE = exports.ENM_FLOW_STATE || (exports.ENM_FLOW_STATE = {}));
var ENM_VALIDATE_SUBSTATE;
(function (ENM_VALIDATE_SUBSTATE) {
    ENM_VALIDATE_SUBSTATE[ENM_VALIDATE_SUBSTATE["START"] = 0] = "START";
    ENM_VALIDATE_SUBSTATE[ENM_VALIDATE_SUBSTATE["VALIDATING"] = 1] = "VALIDATING";
    ENM_VALIDATE_SUBSTATE[ENM_VALIDATE_SUBSTATE["VALIDATED"] = 2] = "VALIDATED";
    ENM_VALIDATE_SUBSTATE[ENM_VALIDATE_SUBSTATE["VALIDATION_FAILED"] = 3] = "VALIDATION_FAILED";
})(ENM_VALIDATE_SUBSTATE = exports.ENM_VALIDATE_SUBSTATE || (exports.ENM_VALIDATE_SUBSTATE = {}));
var ENM_RUN_SUBSTATE;
(function (ENM_RUN_SUBSTATE) {
    ENM_RUN_SUBSTATE[ENM_RUN_SUBSTATE["READY"] = 0] = "READY";
    ENM_RUN_SUBSTATE[ENM_RUN_SUBSTATE["RUNNING"] = 1] = "RUNNING";
    ENM_RUN_SUBSTATE[ENM_RUN_SUBSTATE["TERMINATED_SUCCESS"] = 2] = "TERMINATED_SUCCESS";
    ENM_RUN_SUBSTATE[ENM_RUN_SUBSTATE["TERMINATED_FAIL"] = 3] = "TERMINATED_FAIL";
})(ENM_RUN_SUBSTATE = exports.ENM_RUN_SUBSTATE || (exports.ENM_RUN_SUBSTATE = {}));
var ENM_EDIT_SUBSTATE;
(function (ENM_EDIT_SUBSTATE) {
    ENM_EDIT_SUBSTATE[ENM_EDIT_SUBSTATE["INIT_PARAM"] = 0] = "INIT_PARAM";
    ENM_EDIT_SUBSTATE[ENM_EDIT_SUBSTATE["EDITED"] = 1] = "EDITED";
    ENM_EDIT_SUBSTATE[ENM_EDIT_SUBSTATE["VALIDATE_FALIED"] = 2] = "VALIDATE_FALIED";
})(ENM_EDIT_SUBSTATE = exports.ENM_EDIT_SUBSTATE || (exports.ENM_EDIT_SUBSTATE = {}));
class CWorkNode {
    constructor(val, type) {
        this.state = 0;
        this.subState = 0;
        this.id = (0, uuid_1.v4)();
        // val.id = this.id;
        this.value = val;
        this.type = type !== null && type !== void 0 ? type : ENM_FLOWTYPE.I0_O1;
        this.nexts = [];
        this.prevs = [];
        this.events = new events_1.Events();
        this.updateState(ENM_FLOW_STATE.INITIALIZING);
    }
    updateEditState(subState = 0) {
        let _state = subState;
        this.subState = subState;
        return _state;
    }
    updateValidateState(subState = 0) {
        let _state = subState;
        this.subState = subState;
        return _state;
    }
    updateRunState(subState = 0) {
        let _state = subState;
        this.subState = subState;
        return _state;
    }
    isValidConnection() {
        return true;
    }
    updateState(state, subState = 0) {
        let shouldBeRecursive = false;
        switch (this.state) {
            case ENM_FLOW_STATE.INITIALIZING:
                {
                    if (state == ENM_FLOW_STATE.EDIT) {
                        this.state = ENM_FLOW_STATE.EDIT;
                        this.subState = ENM_EDIT_SUBSTATE.INIT_PARAM;
                    }
                }
                break;
            case ENM_FLOW_STATE.EDIT:
                {
                    this.subState = this.updateEditState(subState);
                    switch (this.subState) {
                        case ENM_EDIT_SUBSTATE.EDITED:
                            {
                                //simple validate for the connection
                                if (this.isValidConnection()) {
                                    this.updateEditState(ENM_EDIT_SUBSTATE.VALIDATE_FALIED);
                                }
                                else {
                                    this.state = ENM_FLOW_STATE.VALIDATE;
                                }
                            }
                            break;
                        case ENM_EDIT_SUBSTATE.VALIDATE_FALIED:
                            {
                                //emit event - invalid connection
                                //update substate
                                this.updateEditState(ENM_EDIT_SUBSTATE.EDITED);
                            }
                            break;
                    }
                }
                break;
            case ENM_FLOW_STATE.VALIDATE:
                {
                    this.subState = this.updateValidateState(subState);
                    switch (this.subState) {
                        case ENM_VALIDATE_SUBSTATE.VALIDATED:
                            {
                                this.state = ENM_FLOW_STATE.RUN;
                            }
                            break;
                        case ENM_VALIDATE_SUBSTATE.VALIDATION_FAILED:
                            {
                                //emit event - failed workflow validation (error_code)
                                this.events.invokeEventHandler(events_1.EVENT_CODE.WORKFLOW_VALIDATION_FAIL);
                                //
                                this.state = ENM_FLOW_STATE.EDIT;
                            }
                            break;
                    }
                }
                break;
            case ENM_FLOW_STATE.RUN:
                {
                    this.subState = this.updateRunState(subState);
                    switch (this.subState) {
                        case ENM_RUN_SUBSTATE.TERMINATED_SUCCESS:
                            {
                                //emit event - success run workflow
                                this.events.invokeEventHandler(events_1.EVENT_CODE.WORKFLOW_RUN_SUCCESS);
                                //goto edit state
                                this.state = ENM_FLOW_STATE.EDIT;
                                this.subState = 0;
                            }
                            break;
                        case ENM_RUN_SUBSTATE.TERMINATED_FAIL:
                            {
                                //emit event - failed run workflow - error_code
                                this.events.invokeEventHandler(events_1.EVENT_CODE.WORKFLOW_RUN_FAILED);
                                //goto edit state
                                this.state = ENM_FLOW_STATE.EDIT;
                                this.subState = 0;
                            }
                            break;
                    }
                }
                break;
        }
        return shouldBeRecursive;
    }
}
exports.CWorkNode = CWorkNode;
