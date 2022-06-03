import { CParam, ParamType } from "./param";

export class CResponse extends CParam {

    private type: ParamType;
    
    constructor(
        fieldName: string, 
        displaySeq: string, 
        fieldId: string="", 
        fieldSrcType: string = "", 
        fieldSrcId: string = "",
        fieldSrcValue: string = "",
        fieldSrcValuePath: string = ""
    ) {
        super(fieldName, displaySeq, fieldId);

        this.type = ParamType.REQUEST;

    }
}