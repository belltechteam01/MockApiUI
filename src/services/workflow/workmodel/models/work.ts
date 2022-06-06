import * as Types from "../../types";
import {WorkflowSettings} from "../../settings";
import { RefObject } from "react";
import { CParam, CRequest, CResponse } from "../params";
import {v4 as uuidv4} from "uuid"

export interface IApi {
    apiId: string;
    apiName: string;
    requestMap: Map<string, CRequest>;
    responseMap: Map<string, CResponse>
}

export interface IWork {
    id: string;
    name: string;
    api: IApi;
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

    private apiDetail: Types.IApiDetail;
    public api: IApi;

    private isSelectedApi: boolean;

    constructor(name: string) {
        this.id = "undefined";
        this.name = name;
        this.color = WorkflowSettings.NODE_COLOR_DEFAULT;
        
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
        }

        this.isSelectedApi = false;
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
    
    public setRequest(id: string, param: CRequest): boolean {
        let isNew: boolean = false;

        const pre_size = this.api.requestMap.size;

        this.api.requestMap.set(id, param);

        return this.api.requestMap.size > pre_size;
    }
}
