import { CWorkMap as WorkMap} from "./workmap";
import { CWorkNode as WorkNode} from "./workmap/worknode";
import { CEdgeMap as EdgeMap } from "./edgemap";
import { ENM_FLOWTYPE } from "./workmap/worknode"

import {WorkflowSettings} from "./settings";
import * as WorkModel from "./workmodel";
import * as Util from "./utils";
import * as Types from "./types";
import { CWork } from "./workmodel/models/work";


export class CWorkflow {
    public id: string = "123";
    public name: string;
    public type: string = "Untitled";
    public changed: boolean = false;

    public worklist: WorkMap<WorkModel.WorkNode>;
    private _edgelist: EdgeMap<Types.IEdge>;

    constructor(name?:string) {
        this.id = WorkflowSettings.WORKFLOW_ID_DEFAULT;
        this.name = name ?? WorkflowSettings.WORKFLOW_NAME_DEFAULT;
        
        this.worklist = new WorkMap<WorkModel.WorkNode>();
        this._edgelist = new EdgeMap<Types.IEdge>();
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

    addNew(type: Types.FlowCatagory): WorkModel.WorkNode {

        let newNode: WorkModel.WorkNode | null = null;
        switch(type) {

            case Types.FlowCatagory.API:
                newNode = new WorkModel.CallApi("untitled");
            break;
            case Types.FlowCatagory.ACTION:
                newNode = new WorkModel.Action("untitled");
            break;
            case Types.FlowCatagory.RULE:
                newNode = new WorkModel.CallRule("untitled");
            break;
            case Types.FlowCatagory.DELAY:
                newNode = new WorkModel.Wait("untitled");
            break;
            case Types.FlowCatagory.CHECK:
                newNode = new WorkModel.Check("untitled");
            break;
            case Types.FlowCatagory.MERGE:
                newNode = new WorkModel.Merge("untitled");
            break;
            case Types.FlowCatagory.SPLIT:
                newNode = new WorkModel.Split("untitled");
            break;
            case Types.FlowCatagory.STOP:
                newNode = new WorkModel.Stop("untitled");
            break;
            
        }
        
        if(!newNode) {
            newNode = new WorkModel.Start("untitled");
        }

        this.add(newNode);
        
        return newNode;
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

    //get edges
    getEdges(): EdgeMap<Types.IEdge>  {
        this._edgelist.removeAll();
        for(var value of this.worklist.getMap().values()) {

            const work: WorkNode<CWork> = value;
            const edges = work.getEdgeAll();
            this._edgelist.appendMany( edges );

        }
        return this._edgelist;
    }

}

export {
    CWorkflow as Workflow,
};