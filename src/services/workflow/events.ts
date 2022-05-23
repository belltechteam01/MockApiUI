
export enum EVENT_CODE {
    UNKNOWN,
    VALIDATION,
    WORKFLOW_RUN_SUCCESS,
    WORKFLOW_RUN_FAILED,
    WORKFLOW_VALIDATION_SUCCESS,
    WORKFLOW_VALIDATION_FAIL,
}

export interface IEvent {
    event_code: number;
    message: string;
    data: Object | null;
}

type CallbackFunc = (param: IEvent) => void;

export interface IListener {
    event_code: number;
    callback: CallbackFunc;
}

export class Events
{
    eventListeners: Map<number, CallbackFunc>;

    constructor()
    {
        this.eventListeners = new Map();
    }

    public static getDescription( error_code: EVENT_CODE )
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
            let params:IEvent = {
            event_code: event_code, 
            message: Events.getDescription(event_code),
            data: null
            };

            callback(params);
        }
    }
};