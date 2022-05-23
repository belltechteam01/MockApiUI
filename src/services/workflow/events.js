"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = exports.EVENT_CODE = void 0;
var EVENT_CODE;
(function (EVENT_CODE) {
    EVENT_CODE[EVENT_CODE["UNKNOWN"] = 0] = "UNKNOWN";
    EVENT_CODE[EVENT_CODE["VALIDATION"] = 1] = "VALIDATION";
    EVENT_CODE[EVENT_CODE["WORKFLOW_RUN_SUCCESS"] = 2] = "WORKFLOW_RUN_SUCCESS";
    EVENT_CODE[EVENT_CODE["WORKFLOW_RUN_FAILED"] = 3] = "WORKFLOW_RUN_FAILED";
    EVENT_CODE[EVENT_CODE["WORKFLOW_VALIDATION_SUCCESS"] = 4] = "WORKFLOW_VALIDATION_SUCCESS";
    EVENT_CODE[EVENT_CODE["WORKFLOW_VALIDATION_FAIL"] = 5] = "WORKFLOW_VALIDATION_FAIL";
})(EVENT_CODE = exports.EVENT_CODE || (exports.EVENT_CODE = {}));
class Events {
    constructor() {
        this.eventListeners = new Map();
    }
    static getDescription(error_code) {
        let desc = "FAILED";
        switch (error_code) {
            case EVENT_CODE.UNKNOWN:
                desc = "Unknown error";
                break;
            case EVENT_CODE.VALIDATION:
                desc = "Validation error";
                break;
        }
        return desc;
    }
    addEventListener(event_code, callback) {
        let bRet = true;
        this.eventListeners.set(event_code, callback);
        return bRet;
    }
    removeEventListener(event_code) {
        let bRet = true;
        this.eventListeners.delete(event_code);
        return bRet;
    }
    getCallback(event_code) {
        var _a;
        return (_a = this.eventListeners.get(event_code)) !== null && _a !== void 0 ? _a : null;
    }
    invokeEventHandler(event_code) {
        const callback = this.getCallback(event_code);
        if (callback) {
            let params = {
                event_code: event_code,
                message: Events.getDescription(event_code),
                data: null
            };
            callback(params);
        }
    }
}
exports.Events = Events;
;
