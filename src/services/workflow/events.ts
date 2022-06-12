
import * as Types from "./types";
import {WorkflowSevice} from "../api"

export enum EVENT_CODE {
    UNKNOWN,
    VALIDATION,
    WORKFLOW_RUN_SUCCESS,
    WORKFLOW_RUN_FAILED,
    WORKFLOW_VALIDATION_SUCCESS,
    WORKFLOW_VALIDATION_FAIL,
    NODE_VALIDATION_SUCCESS,
    NODE_VALIDATION_FAIL,
    NODE_CONNECTION_INVALID,
    NODE_SETTING_GET_APILIST,
    NODE_STATE_CHANGE
}

type CallbackFunc = (param: Types.IEvent) => void;

export interface IListener {
    event_code: EVENT_CODE;
    callback: CallbackFunc;
}

export class Events
{
    eventListeners: Map<number, CallbackFunc>;
    
    constructor()
    {
        this.eventListeners = new Map();
    }

    public addEventListener(event_code: EVENT_CODE, callback: CallbackFunc): boolean {
        let bRet = true;
  
        this.eventListeners.set(event_code, callback);
        return bRet;
    }

    public removeEventListener(event_code: EVENT_CODE) {

        let bRet = true;

        this.eventListeners.delete(event_code);
        return bRet;
    }
  
    protected getCallback(event_code: EVENT_CODE): CallbackFunc | null {

        return this.eventListeners.get(event_code) ?? null;
    }

    public invokeEventHandler(event_code: EVENT_CODE, data: any = undefined): void {
    
        const callback = this.getCallback(event_code);
        console.log("[LOG] callback list", this.eventListeners);
        console.log("[LOG] invoke callback", callback);
        if(callback) {
            let params: Types.IEvent = {
                event_code: event_code, 
                message: Events.getDescription(event_code),
                data: data ?? this.getInvokeResult(event_code)
            };

            callback(params);
        }
    }

    protected static getDescription( error_code: EVENT_CODE )
    {
        let desc = "FAILED";
        switch(error_code) {
            case EVENT_CODE.UNKNOWN: 
                desc = "Unknown error";
            break;
            case EVENT_CODE.VALIDATION: 
                desc = "Validation error";
            break;
        }
        return desc;
    }

    protected getInvokeResult(error_code: EVENT_CODE): any {
        let ret: any = null;
        switch(error_code) {
            case EVENT_CODE.WORKFLOW_RUN_SUCCESS: 
                ret = this.runWorkflow();
            break;
            case EVENT_CODE.NODE_STATE_CHANGE: 
                ret = "red";
            break;
        }
        return ret;
    }

    // protected selectApi(apiId: string, nodeId: string): Types.IApiDetail {
    //     let ret: Types.IApiDetail;

    //     return ret;
    // }

    // protected getReqParam(reqPath: string, nodeId: string): Types.IRequestItem {
    //     let ret: Types.IRequestItem;

    //     return ret;
    // }

    // protected addReqParam(reqPath: string, nodeId: string): Types.IRequestItem {
    //     let ret: Types.IRequestItem;

    //     return ret;
    // }
    
    // protected editReqParam(reqPath: string, nodeId: string): Types.IRequestItem {
    //     let ret: Types.IRequestItem;

    //     return ret;
    // }
    
    // protected deleteReqParam(reqPath: string, nodeId: string): boolean{
    //     let bRet: boolean = false;

    //     return bRet;
    // }
    
    // protected getResponseParam(reqPath: string, nodeId: string): Types.IResponseItem {
    //     let ret: Types.IResponseItem;

    //     return ret;
    // }

    // protected addResponseParam(reqPath: string, nodeId: string): Types.IResponseItem {
    //     let ret: Types.IResponseItem;

    //     return ret;
    // }
    
    // protected editResponseParam(reqPath: string, nodeId: string): Types.IResponseItem {
    //     let ret: Types.IResponseItem;

    //     return ret;
    // }
    
    // protected deleteResponseParam(reqPath: string, nodeId: string): boolean {
    //     let bRet: boolean = false;

    //     return bRet;
    // }

    // protected getStatusCodes(nodeId: string): Types.ICheckCondition {
    //     let ret: Types.ICheckCondition;

    //     return ret;
    // }

    // protected setStatusCodes(statusCodes: string, nodeId: string): Types.ICheckCondition {
    //     let ret: Types.ICheckCondition;

    //     return ret;
    // }

    protected runWorkflow() : boolean {
        let bRet: boolean = false;

        //make disabling of workflow edit

        //stop button active

        //start watcher of running status (watcher status : 0 - init, 1 - running, 2 - success, 3 - failed)

        return bRet;
    }

    protected stopWorkflow() : boolean {
        let bRet: boolean = false;

        return bRet;
    }


    protected runTest() : boolean {
        let bRet: boolean = false;

        return bRet;
    }

    protected stopTest() : boolean {
        let bRet: boolean = false;

        return bRet;
    }
};