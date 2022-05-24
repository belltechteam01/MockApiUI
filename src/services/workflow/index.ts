import { CWorkMap as WorkMap} from "./workmap"
import { ENM_FLOWTYPE } from "./workmap/worknode"

import {WorkflowSettings} from "./settings";
import * as WorkModel from "./workmodel";
import * as Util from "./utils";
import * as Types from "./types";


export class CWorkflow {
    public id: string = "123";
    public name: string;
    public type: string = "COLLECTION";

    public worklist: WorkMap<WorkModel.WorkNode>; 

    constructor(name?:string) {
        this.id = WorkflowSettings.WORKFLOW_ID_DEFAULT;
        this.name = name ?? WorkflowSettings.WORKFLOW_NAME_DEFAULT;
        
        this.worklist = new WorkMap<WorkModel.WorkNode>();
    }

    add(model: WorkModel.WorkNode, type?: ENM_FLOWTYPE) {
        let _type = type;
        if(!_type) {
            WorkflowSettings.NODE_TYPE_DEFAULT;
            switch(model.constructor.name) {
                case "CWorkAction": { _type = ENM_FLOWTYPE.I1_O0; break; }
                case "CWorkCallApi": { _type = ENM_FLOWTYPE.I0_O2; break; }
                case "CWorkCallRule": { _type = ENM_FLOWTYPE.I0_O1; break; }
                case "CWorkWait": { _type = ENM_FLOWTYPE.I1_O1; break; }
                case "CWorkMerge": { _type = ENM_FLOWTYPE.I2_O1; break; }
                case "CWorkSplit": { _type = ENM_FLOWTYPE.I1_O2; break; }
                case "CWorkCheck": { _type = ENM_FLOWTYPE.I1_O2; break; }
                case "CWorkStart": { _type = ENM_FLOWTYPE.I0_O1; break; }
                case "CWorkEnd": { _type = ENM_FLOWTYPE.I1_O0; break; }
            }
        }
        
        this.worklist.append(model, _type);
    }

    moveTo(id: string) {
        console.log("workflow moveto");
        // const bMoved = this.worklist.moveToRoot();
        console.log(JSON.stringify(this.worklist.toArray))
    }
    
    excute() {
        console.log("workflow excute");
    }

    parseApiList( json: string ) {
        let data = Util.parseJson(json);
        if(data) {
            // const apiDetail: Types.IApiDetail = 
        }
    }
}

export {
    CWorkflow as Workflow,
};