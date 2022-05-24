
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
}

type CallbackFunc = (param: Types.IEvent) => void;

export interface IListener {
    event_code: number;
    callback: CallbackFunc;
}

export class Events
{
    private static _instance: Events;
    eventListeners: Map<number, CallbackFunc>;
    
    constructor()
    {
        this.eventListeners = new Map();
        Events._instance = this;
    }

    public static getInstance() {
        return Events._instance;
    }

    public addEventListener(event_code: number, callback: CallbackFunc): boolean {
        let bRet = true;
  
        this.eventListeners.set(event_code, callback);
        return bRet;
    }

    public removeEventListener(event_code: number) {

        let bRet = true;

        this.eventListeners.delete(event_code);
        return bRet;
    }
  
    protected getCallback(event_code: number): CallbackFunc | null {

        return this.eventListeners.get(event_code) ?? null;
    }

    public invokeEventHandler(event_code: number): void {
    
        const callback = this.getCallback(event_code);
        if(callback) {
            let params: Types.IEvent = {
                event_code: event_code, 
                message: Events.getDescription(event_code),
                data: this.getInvokeResult(event_code)
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
        }
        return ret;
    }

    protected getApiList = async () => {
        let ret: Types.IApiList;
        const response = await WorkflowSevice.getCustomerDetails();
        
        return {};
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