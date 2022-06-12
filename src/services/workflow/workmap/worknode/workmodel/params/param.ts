import { RefObject } from "react";
import {v4 as uuidv4} from "uuid"

import * as Types from "services/workflow/types";
import { breakpoints } from "@mui/system";

export enum ParamType {
    REQUEST,
    RESPONSE
}

export enum ParamSrcType {
    API,
    INPUTDATA,
    RULE
}

export class CParam implements Types.IParam
{
    id: string;
    fieldId: string;
    displaySeq: string;
    fieldName: string;
    fieldSourceType: string;
    fieldSourceValue: string;
    fieldSourceId: string;
    fieldSourceValuePath: string;
    // nodeId: string;
    private static paramsMap: Map<string, CParam>;

    constructor(
        fieldName: string, 
        displaySeq: string="0", 
        fieldId: string="", 
        fieldSrcType: string = "", 
        fieldSrcId: string = "",
        fieldSrcValue: string = "",
        fieldSrcValuePath: string = ""
    ) {
        this.id = uuidv4();
        this.fieldId = fieldId;
        this.fieldName = fieldName;
        this.displaySeq = displaySeq;

        this.fieldSourceId = fieldSrcId;
        this.fieldSourceType = fieldSrcType;
        this.fieldSourceValue = fieldSrcValue;
        this.fieldSourceValuePath = fieldSrcValuePath;

        if(!CParam.paramsMap)
            CParam.paramsMap = new Map();
    }

    static getMap(): Map<string, CParam>
    {
        return CParam.paramsMap;
    }

    static getParam(id: string): CParam
    {
        return CParam.paramsMap.get(id) ?? new CParam("","");
    }

    static setParam(id: string, param: CParam): CParam | undefined
    {
        CParam.paramsMap.set(id, param);
        return CParam.getParam(id);
    }

    static deleteParam(id: string): boolean
    {
        let bRet = false;
        var param = CParam.paramsMap.get(id);
        if(param) {
            param = undefined;
            bRet = CParam.paramsMap.delete(id);
        }
        return bRet;
    }

    getParamData() : Types.IParam
    {
        return {
            id: this.id,
            fieldId: this.fieldId,
            displaySeq: this.displaySeq,
            fieldName: this.fieldName,
            fieldSourceId: this.fieldSourceId,
            fieldSourceType: this.fieldSourceType,
            fieldSourceValue: this.fieldSourceValue,
            fieldSourceValuePath: this.fieldSourceValuePath,
        }
    }

    // setNodeId(nodeId: string) {
    //     this.nodeId = nodeId;
    // }

    getType(): ParamSrcType {
        let ret = ParamSrcType.API;

        if(this.fieldSourceType == ParamSrcType[ParamSrcType.API])
            ret = ParamSrcType.API;
        else if(this.fieldSourceType == ParamSrcType[ParamSrcType.INPUTDATA])
            ret = ParamSrcType.INPUTDATA;
        else if(this.fieldSourceType == ParamSrcType[ParamSrcType.RULE])
            ret = ParamSrcType.INPUTDATA;

        return ret;
    }

    private getSrcValuePath(): string[] {
        let ret: Array<string>;
        
        if(this.fieldSourceValuePath.length > 0) {
            ret = this.fieldSourceValuePath.split(".");
        }else
            ret = [];

        return ret;
    }

    getFieldSourceValuePath()
    {
        return this.fieldSourceValuePath;
    }

    getFieldName()
    {
        return this.fieldName;
    }
    
    getFieldSourceId()
    {
        return this.fieldSourceId;
    }
    private verifyPath(path: string[]) {
        let bRet = false;
        if(path.length > 0) {

            bRet = true;
        }        

        return bRet;
    }

    setSrcValuePath(valuePath: string): string[] {

        this.fieldSourceValuePath = valuePath;
        return this.getSrcValuePath();
    }

    setFieldSourceId(srcId: string): boolean
    {
        let bRet = false;

        if(srcId && srcId != "")
            this.fieldSourceId = srcId;

        return bRet;
    }

    setFieldSrcType(srcType: ParamSrcType) {
        this.fieldSourceType = ParamSrcType[srcType];
    }

    public getValueType(): ParamSrcType {
        return ParamSrcType[this.fieldSourceType];
        // return ParamSrcType.INPUTDATA;
    }
}
