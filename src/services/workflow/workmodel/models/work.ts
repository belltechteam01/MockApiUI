import * as Types from "../../types";
import {WorkflowSettings} from "../../settings";
import { RefObject } from "react";

export interface IWork {
    id: string;
    name: string;
    api: Types.IApiDetail;
}

export abstract class CWork implements IWork
{
    public id: string;
    public name: string;
    public color: string;
    public xPos: number;
    public yPos: number;
    public abstract type: Types.FlowCatagory;
    public abstract readonly inputs: number;
    public abstract readonly outputs: number;
    public labelRef: RefObject<HTMLDivElement>;

    api: Types.IApiDetail;

    constructor(name: string) {
        this.id = "undefined";
        this.name = name;
        this.color = WorkflowSettings.NODE_COLOR_DEFAULT;
        
        this.api = {
            id : this.id,
            apiName: name,
            apiId: "",
            requestMap: new Map(),
            responseMap: new Map(),
            failCodeMap: new Map(),
            successCodeMap: new Map(),
            
            faliureHttpCodes: [],
            outputData: [],
            parent: null,
            requestData: [], 
            successHttpCodes: [],
        };
    }

    setPosition(x: number, y: number) {
        this.xPos = x;
        this.yPos = y;
    }

    run() {
        console.log("Work base running");
    }

    changeNodeName(name: string) {
        if(name) {
        this.labelRef?.current?.replaceChildren(name);
        this.name = name;
            this.labelRef?.current?.replaceChildren(name);
            this.name = name;
        }
    }
              
}
