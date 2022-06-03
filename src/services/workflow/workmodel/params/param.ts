import * as Types from "../../types";
import {WorkflowSettings} from "../../settings";
import { RefObject } from "react";
import {v4 as uuidv4} from "uuid"

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
    nodeId: string;

    constructor(
        fieldName: string, 
        displaySeq: string, 
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
    }

    setNodeId(nodeId: string) {
        this.nodeId = nodeId;
    }

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

    getSrcValuePath(): string[] {
        let ret: Array<string>;
        
        if(this.fieldSourceValuePath.length > 0) {
            ret = this.fieldSourceValuePath.split(".");
        }else
            ret = [];

        return ret;
    }

    getSrcValuePathStyled()
    {
        return this.fieldSourceValuePath;
    }
    
    private verifyPath(path: string[]) {
        let bRet = false;
        if(path.length > 0) {

            bRet = true;
        }        

        return bRet;
    }

    setSrcValuePath(valuePath: string): string[] {

        if(valuePath.length > 0) {
            let aryValuePath = valuePath.split(".");
            if(this.verifyPath(aryValuePath)) {
                this.fieldSourceValuePath = aryValuePath.join(".");
            }
        }

        return this.getSrcValuePath();
    }

    public getValueType(): ParamSrcType {
        return ParamSrcType[this.fieldSourceType];
    }
}
