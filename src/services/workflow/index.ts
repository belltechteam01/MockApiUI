import { CWork as WorkBase } from "./workmodel/work"
import { CWorkAction as Action } from "./workmodel/action"
import { CWorkCallApi as CallApi } from "./workmodel/callapi"
import { CWorkCallRule as CallRule } from "./workmodel/callrule"
import { CWorkMerge as WorkMerge} from "./workmodel/merge"
import { CWorkSplit as WorkSplit} from "./workmodel/split"
import { CWorkWait as ProcessWait} from "./workmodel/wait"
import { CWorkCheck as ProcessCheck} from "./workmodel/check"
import { CWorkStop as ProcessStop} from "./workmodel/stop"
import { CWorkStart as ProcessStart} from "./workmodel/start"

import { CWorkMap as WorkMap} from "./workmap"
import { ENM_FLOWTYPE } from "./workmap/worknode"

import {WorkflowSettings} from "./settings";


export class CWorkflow {
    public id: string = "123";
    public name: string;
    public type: string = "COLLECTION";

    public worklist: WorkMap<WorkBase>; 

    constructor(name?:string) {
        this.id = WorkflowSettings.WORKFLOW_ID_DEFAULT;
        this.name = name ?? WorkflowSettings.WORKFLOW_NAME_DEFAULT;
        
        this.worklist = new WorkMap<WorkBase>();
    }

    add(model: WorkBase, type?: ENM_FLOWTYPE) {
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
}

export { 
    WorkBase, 
    Action,
    CallApi,
    CallRule,
    WorkMerge,
    WorkSplit,
    ProcessWait,
    ProcessCheck,
    ProcessStop,
    ProcessStart,
    CWorkflow as Workflow,
};