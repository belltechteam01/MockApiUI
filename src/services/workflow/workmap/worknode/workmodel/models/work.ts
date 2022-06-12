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
            requests: [],
            responses: [],
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

    //getter
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

    //request
    static getParams()
    {
        return Param.CParam.getMap();78
    }

    clearParams()
    {
        this.api.requests = [];
        this.api.responses = [];
    }

    clearRequests()
    {
        this.api.requests = [];
    }

    clearResponses()
    {
        this.api.responses = [];
    }

    getParam(id: string)
    {
        return Param.CParam.getParam(id);
    }

    //requests
    addRequest(id: string, param: Param.CParam)
    {
        this.api.requests[id] = param;
        return Param.CParam.setParam(id, param);
    }

    deleteRequst(id: string)
    {
        delete this.api.requests[id];
        return Param.CParam.deleteParam(id);
    }

    getRequest(id: string)
    {
        return this.api.requests[id];
    }

    getRequests()
    {
        return this.api.requests;
    }

    //responses
    addResponse(id: string, param: Param.CParam)
    {
        this.api.responses[id] = param;
        return Param.CParam.setParam(id, param);
    }

    deleteResponse(id: string)
    {
        delete this.api.responses[id];
        return Param.CParam.deleteParam(id);
    }

    getResponse(id: string)
    {
        return this.api.responses[id];
    }

    getResponses()
    {
        return this.api.responses;
    }
}
