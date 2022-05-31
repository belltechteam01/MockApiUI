import { CWorkMap as WorkMap} from "./workmap";
import { CWorkNode as WorkNode, ENM_FLOW_STATE} from "./workmap/worknode";
import { CEdgeMap as EdgeMap } from "./edgemap";
import { ENM_FLOWTYPE } from "./workmap/worknode"

import {WorkflowSettings} from "./settings";
import * as WorkModel from "./workmodel";
import * as Util from "./utils";
import * as Types from "./types";
import { CWork } from "./workmodel/models/work";
import {WorkflowSevice} from "services/api";
import { v4 as uuidv4 } from 'uuid';
import { request } from "http";


export class CWorkflow {
    public id: string = "123";
    public name: string;
    public type: string = "Untitled";
    public changed: boolean = false;

    public worklist: WorkMap<WorkModel.Work>;
    private _edgelist: EdgeMap<Types.IEdge>;

    static flowData: Types.IFlow;
    private requests: Map<string, Types.IRequestItem>;
    private responses: Map<string, Types.IResponseItem>;

    constructor(name?:string) {
        this.id = WorkflowSettings.WORKFLOW_ID_DEFAULT;
        this.name = name ?? WorkflowSettings.WORKFLOW_NAME_DEFAULT;
        
        this.worklist = new WorkMap<WorkModel.Work>();
        this._edgelist = new EdgeMap<Types.IEdge>();

        // console.log("[LOG] new workflow");
        CWorkflow.getFlowData();
        this.requests = new Map();
        this.responses = new Map();
    }

    add(model: WorkModel.Work, type?: ENM_FLOWTYPE) {
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

    //logic controller functions
    placeNode(type: Types.FlowCatagory): WorkModel.Work {

        let newWork: WorkModel.Work | null = null;
        switch(type) {

            case Types.FlowCatagory.API:
                newWork = new WorkModel.CallApi("untitled");
            break;
            case Types.FlowCatagory.ACTION:
                newWork = new WorkModel.Action("untitled");
            break;
            case Types.FlowCatagory.RULE:
                newWork = new WorkModel.CallRule("untitled");
            break;
            case Types.FlowCatagory.DELAY:
                newWork = new WorkModel.Wait("untitled");
            break;
            case Types.FlowCatagory.CHECK:
                newWork = new WorkModel.Check("untitled");
            break;
            case Types.FlowCatagory.MERGE:
                newWork = new WorkModel.Merge("untitled");
            break;
            case Types.FlowCatagory.SPLIT:
                newWork = new WorkModel.Split("untitled");
            break;
            case Types.FlowCatagory.STOP:
                newWork = new WorkModel.Stop("untitled");
            break;
            
        }
        
        if(!newWork) {
            newWork = new WorkModel.Start("untitled");
        }

        this.add(newWork);

        const workNode = this.worklist.get(newWork.id);
        workNode?.gotoState(ENM_FLOW_STATE.INITIALIZING);

        return newWork;
    }

    public static getFlowData(): Types.IFlow {
        
        if(this.flowData) return this.flowData;

        WorkflowSevice.getCustomerDetails().then((r: any) => {
            
            const flowData = r as Types.IFlow;
            CWorkflow.flowData = flowData;
            // console.log("[CALL] get workflow", flowData);
        });
        
        return this.flowData;
    }

    public getFlowStep(flowStepId: string): Types.IFlowStep | null {
      var ret: Types.IFlowStep | null = null;

      const flowData = CWorkflow.getFlowData();

      const flowStep = Util.parseFlowData(flowData, Util.ENM_ParseType.FLOW_STEP, "2344", flowStepId ) as Types.IFlowStep;
      if(flowStep) ret = flowStep;

      return ret;
    }

    public getApiDetail(flowStepId: string, apiId: string): Types.IApiDetail | null {
      var ret: Types.IApiDetail | null = null;
      
      const flowData = CWorkflow.getFlowData();
      
      const apiDetail = Util.parseFlowData(flowData, Util.ENM_ParseType.API_DETAIL, "2344", flowStepId, apiId ) as Types.IApiDetail;
      if(apiDetail) {

          ret = apiDetail;
      }

      return ret;
    }

    public getRequestMap(): Map<string, Types.IRequestItem> {

        if(this.requests.size == 0) {
            const flowData = CWorkflow.getFlowData();

            for(let flowStep of flowData.flowSteps) {
                const requests = this.getRequests(flowStep.flowStepId);
                for(let request of requests) {
                    if(request && request.id)
                        this.requests.set(request.id, request);
                }
            }
        }

        return this.requests;
    }

    public getResponseMap(): Map<string, Types.IResponseItem> {

        if(this.requests.size == 0) {
            const flowData = CWorkflow.getFlowData();

            for(let flowStep of flowData.flowSteps) {
                const responses = this.getResponses(flowStep.flowStepId);
                for(let response of responses) {
                    if(response && response.id)
                        this.responses.set(response.id, response);
                }
            }
        }

        return this.responses;
    }

    public getRequest(requestId: string = ""): Types.IRequestItem[] {
        var ret: Array<Types.IRequestItem> = [];
        const flowData = CWorkflow.getFlowData();

        for(let flowStep of flowData.flowSteps) {
            const requests = this.getRequests(flowStep.flowStepId);
            ret = ret.concat(requests);
        }

        if(requestId != "") {
            var bExist = false;
            for(let request of ret) {
                if(request.id == requestId) {
                    ret = [request];
                    bExist = true;
                    break;
                }
            }
            if(!bExist) ret = [];
        }

        return ret;
    }

    public getRequests(flowStepId: string): Types.IRequestItem[] {
      var ret: Array<Types.IRequestItem> = [];
      
      const flowData = CWorkflow.getFlowData();
      
      const requestItems = Util.parseFlowData(flowData, Util.ENM_ParseType.API_REQUESTS, "2344", flowStepId ) as Array<Types.IRequestItem>;
      if(requestItems) {
        for(let itm of requestItems) {
            itm.path = "flowSteps.flowStepId."+flowStepId+".apiDetails.requestData.fieldId";
            if(itm.id == undefined) itm.id = uuidv4();
        }
        ret = requestItems;
      }

      return ret;
    }

    public getResponses(flowStepId: string): Types.IResponseItem[] {
      var ret: Array<Types.IResponseItem> = [];

      const flowData = CWorkflow.getFlowData();
      
      const responseItems = Util.parseFlowData(flowData, Util.ENM_ParseType.API_RESPONSES, "2344", flowStepId ) as Array<Types.IResponseItem>;
      if(responseItems) {
        for(let itm of responseItems) {
            itm.path = "flowSteps.flowStepId."+flowStepId+".apiDetails.outputData.fieldId";
            if(itm.id == undefined) itm.id = uuidv4();
        }
        ret = responseItems;
      }
      return ret;
    }

    public getRuleOutputs(flowStepId: string): Types.IOutputDataItem[] {
      var ret: Array<Types.IOutputDataItem> = [];

      const flowData = CWorkflow.getFlowData();
      
      const ruleDetails = Util.parseFlowData(flowData, Util.ENM_ParseType.API_RULE_DETAIS, "2344", flowStepId ) as Types.IRulesDetails;

      if(ruleDetails) {
        ret = ruleDetails.outputData;
        for(let itm of ruleDetails.outputData) {
            itm.path = "flowSteps.flowStepId."+flowStepId+".rulesDetails.outputData.fieldId";
            if(itm.id == undefined) itm.id = uuidv4();
        }
      }
      return ret;
    }

    public getRuleInputs(flowStepId: string): Types.IInputDataItem[] {
      var ret: Array<Types.IInputDataItem> = [];

      const flowData = CWorkflow.getFlowData();
      
      const ruleDetails = Util.parseFlowData(flowData, Util.ENM_ParseType.API_RULE_DETAIS, "2344", flowStepId ) as Types.IRulesDetails;

      if(ruleDetails) {
        ret = ruleDetails.inputData;
        for(let itm of ruleDetails.inputData) {
            itm.path = "flowSteps.flowStepId."+flowStepId+".rulesDetails.inputData.fieldId";
            if(itm.id == undefined) itm.id = uuidv4();
        }
      }
      return ret;
    }

    public getRuleDetails(flowStepId: string): Types.IRulesDetails | null {
      var ret: Types.IRulesDetails | null = null;

      const flowData = CWorkflow.getFlowData();
      
      const ruleDetails = Util.parseFlowData(flowData, Util.ENM_ParseType.API_RULE_DETAIS, "2344", flowStepId ) as Types.IRulesDetails;

      if(ruleDetails) {
        ret = ruleDetails;
      }
      return ret;
    }

    public getAttribute(attrPath: string): any {
        var ret = {};
        
        let keys = attrPath.split(WorkflowSettings.FLOW_PATH_DELIMITER);
        if(keys.length == 0) return ret;

        let attr = Util.getAttr(CWorkflow.getFlowData(), keys);
        if(attr) {
            ret = attr[keys[keys.length-1]];
        }
        ret = attr;

        return ret;
    }
}

export {
    CWorkflow as Workflow,
};