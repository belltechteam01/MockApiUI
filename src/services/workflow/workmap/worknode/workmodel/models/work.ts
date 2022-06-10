import { RefObject } from "react";
import {v4 as uuidv4} from "uuid"

import * as Param from "../params";
import * as Type from "services/workflow/types";
import { WorkflowSettings as Setting } from "services/workflow/settings";
import {IApi, IWork} from "../index"

export abstract class CWork implements IWork
{
    public id: string;
    public name: string;
    public color: string;
    public xPos: number;
    public yPos: number;
    public abstract type: Type.FlowCatagory;
    public abstract readonly inputs: number;
    public abstract readonly outputs: number;
    public labelRef: RefObject<HTMLDivElement>;

    private apiDetail: Type.IApiDetail;
    public api: IApi;

    private isSelectedApi: boolean;
    private _instance: CWork;

    constructor(name: string) {
        this.id = "undefined";
        this.name = name;
        this.color = Setting.NODE_COLOR_DEFAULT;
        
        this.apiDetail = {
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

        this.api = {
            apiId:"",
            apiName: "",
            requestMap: new Map(),
            responseMap: new Map(),
            jsonData: ""
        }

        this.isSelectedApi = false;
        this._instance = this;
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

    getRequests()
    {
        return this.api.requestMap;
    }

    getResponses()
    {
        return this.api.responseMap;
    }

    getApiId()
    {
        return this.api.apiId;
    }

    isApiSelected()
    {
        return this.isSelectedApi;
    }

    getApiName()
    {
        return this.api.apiName;
    }
    
    public setRequest(id: string, param: Param.CRequest): boolean {
        let isNew: boolean = false;

        const pre_size = this.api.requestMap.size;

        this.api.requestMap.set(id, param);

        return this.api.requestMap.size > pre_size;
    }

    public setResponse(id: string, param: Param.CResponse): boolean {
        let isNew: boolean = false;

        const pre_size = this.api.responseMap.size;

        this.api.responseMap.set(id, param);

        return this.api.responseMap.size > pre_size;
    }
}
