import { v4 as uuidv4 } from 'uuid';

import {WorkflowSevice} from "services/api";
import {WorkflowSettings as Setting} from "./settings";
import * as Util from "./utils";
import * as Type from "./types";

import { CWorkMap, CWorkNode, ENM_FLOWTYPE, ENM_FLOW_STATE } from "./workmap";
import { CEdgeMap } from "./edgemap";
import * as WorkModel from "./workmap/worknode/workmodel";
import {ParamSrcType} from "./workmap/worknode/workmodel";

import { EventEmitter } from "eventemitter3";
import { ModalType } from "components/Modals";
import { CConnection } from "./edgemap/connection";

export enum STATE_WORKFLOW {
    INIT,
    EDIT, 
    RUN
}

enum SUBSTATE_INIT {
    INITIAL = 0,
    READY_FLOWDATA = 1,
    READY_APILIST = 2
}

export enum EvtCode {
    EVT_SETTING_FAILED_OPEN,
    EVT_RECEIVE_RESPONSE_FLOWDATA,
    EVT_RECEIVE_RESPONSE_APILIST,
}

export enum WxEvent {
    TEST,
    WARN,
    APICALL,
}

export class CWorkflow extends EventEmitter {
    public id: string = "123";
    private companyId: string = "1";
    public name: string;
    public type: string = "Untitled";
    public changed: boolean = false;

    public workmap: CWorkMap<WorkModel.CWork>;

    //workflow state
    private state: STATE_WORKFLOW;
    private subState: number;

    //cached workflowData
    // private flowData: Type.IFlow;

    //cached apiList
    private apiListData: Type.IApiList;

    //cached apiDetail
    // private apiDetailData: Type.IApiItem;
    // private lstParam: WorkModel.CParam;

    private static _instance: CWorkflow;

    constructor(name?:string) {
        
        console.log("[WARN] created new workflow instance");
        super();

        this.id = Setting.WORKFLOW_ID_DEFAULT;
        this.name = name ?? Setting.WORKFLOW_NAME_DEFAULT;
        
        this.workmap = new CWorkMap<WorkModel.CWork>();

        this.state = STATE_WORKFLOW.INIT;
        this.subState = SUBSTATE_INIT.INITIAL;
        
        CWorkflow._instance = this;

        this.addListener(WxEvent[WxEvent.TEST], this.onTest);
        this.addListener(WxEvent[WxEvent.WARN], this.onWarn);
        this.addListener(WxEvent[WxEvent.APICALL], this.onApiCallProc);
    }

    public static getInstance(): CWorkflow {
        if(!this._instance) {
            this._instance = new CWorkflow();
        }
        return this._instance;
    }

    //@ event listener
    private onTest() {
        // console.log("[LOG] onTest call listen", this);
    }

    //@ event listener
    private onWarn(code: EvtCode) {
        switch(code) {
            case EvtCode.EVT_SETTING_FAILED_OPEN:
                console.log("[WARN] Couldn't you read workflow data?");
                break;
        }
    }

    //@ event listener
    private onApiCallProc(code: EvtCode) {

        console.log("[LOG] apicall event", code);
        switch(code) {
            case EvtCode.EVT_RECEIVE_RESPONSE_APILIST:
                if(this.state == STATE_WORKFLOW.INIT) {
                    this.subState = this.subState | SUBSTATE_INIT.READY_APILIST;
                    this.gotoState(STATE_WORKFLOW.EDIT);
                }
            break;
            case EvtCode.EVT_RECEIVE_RESPONSE_FLOWDATA:
                if(this.state == STATE_WORKFLOW.INIT) {
                    this.subState = this.subState | SUBSTATE_INIT.READY_FLOWDATA;
                    this.gotoState(STATE_WORKFLOW.EDIT);
                }
            break;
        }
        // console.log("[LOG] onApiCallProc", this.subState);
    }
    
    //@ event listener
    onConnect(id:string, source_id: string, dest_id: string) 
    {
        if(!source_id || source_id == "") return;
        if(!dest_id || dest_id == "") return;

        const src = this.getNode(source_id);
        const dest = this.getNode(dest_id);

        if(src && dest) {
            let connection = new CConnection(src, dest, id);
        }
    }

    //@ function - add workModel
    private addModel(model: WorkModel.CWork, type?: ENM_FLOWTYPE) {
        let _type = type;
        if(!_type) {
            Setting.NODE_TYPE_DEFAULT;
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
        
        this.workmap.append(model, _type);
    }

    //logic controller functions
    createNode(type: Type.FlowCatagory) {

        let newWork: WorkModel.CWork | null = null;
        switch(type) {

            case Type.FlowCatagory.API:
                newWork = new WorkModel.CWorkCallApi("untitled");
            break;
            case Type.FlowCatagory.ACTION:
                newWork = new WorkModel.CWorkAction("untitled");
            break;
            case Type.FlowCatagory.RULE:
                newWork = new WorkModel.CWorkCallRule("untitled");
            break;
            case Type.FlowCatagory.DELAY:
                newWork = new WorkModel.CWorkWait("untitled");
            break;
            case Type.FlowCatagory.CHECK:
                newWork = new WorkModel.CWorkCheck("untitled");
            break;
            case Type.FlowCatagory.MERGE:
                newWork = new WorkModel.CWorkMerge("untitled");
            break;
            case Type.FlowCatagory.SPLIT:
                newWork = new WorkModel.CWorkSplit("untitled");
            break;
            case Type.FlowCatagory.STOP:
                newWork = new WorkModel.CWorkStop("untitled");
            break;
            
        }
        
        if(!newWork) {
            newWork = new WorkModel.CWorkStart("untitled");
        }

        this.addModel(newWork);

        const workNode = this.workmap.get(newWork.id);
        workNode?.gotoState(ENM_FLOW_STATE.INITIALIZING);

        return workNode;
    }

//     public getFlowData(): Type.IFlow {
        
// //         if(this.flowData) return this.flowData;

// // //        console.log("[CHECK] read flowData from server");
// //         WorkflowSevice.getFlowData().then((r: any) => {
            
// //             // console.log("[LOG] workflow response", r);
// //             const flowData = r as Type.IFlow;
// //             this.flowData = flowData;
// //             this.parseFlowData();

// //             this.emit(WxEvent[WxEvent.APICALL], EvtCode.EVT_RECEIVE_RESPONSE_FLOWDATA);
// //         });
        
// //         return this.flowData;
//     }

    public getApiListData(companyId: string, isUpdate: boolean = false): Type.IApiList {

        if(isUpdate) {
            WorkflowSevice.getAll(companyId).then((r: any) => {
                // console.log("[LOG] apilist response", r);
               
                this.apiListData = r as Type.IApiList;

                if(this.apiListData.Items) {

                    this.apiListData.itemsMap = new Map();

                    //convert elements array to Map
                    for(let item of this.apiListData.Items) {
                        let elements = new Map();

                        item.dataElements.forEach((value, key) => {
                            Object.entries(value).map(([key, value]) => {
                                elements.set(key, value);
                            })
                        })
                        
                        item.dataElements = new Map<string, Type.IDataElement>();
                        item.dataElementList = [];
                        elements.forEach((value, key) => {
                            item.dataElements.set(key, value);
                            item.dataElementList.push(value);
                        })

                        this.apiListData.itemsMap.set(item.apiId, item);
                    }
                    this.emit(WxEvent[WxEvent.APICALL], EvtCode.EVT_RECEIVE_RESPONSE_APILIST);
                }
            });
        }
        return this.apiListData;
    }

    public isState(state: STATE_WORKFLOW) {
        return this.state === state;
    }

    public gotoState(state: STATE_WORKFLOW) {
        switch(this.state) {
            case STATE_WORKFLOW.INIT:
                
                if(state == STATE_WORKFLOW.EDIT) {
                    if(this.subState & SUBSTATE_INIT.READY_APILIST 
                        // && this.subState & SUBSTATE_INIT.READY_FLOWDATA
                        )
                        this.state = STATE_WORKFLOW.EDIT;
                }

            break;
            case STATE_WORKFLOW.RUN:
            break;
            case STATE_WORKFLOW.EDIT:
            break;
        }
    }

    //get elementsMap of apiList (request fields)
    public getApiList(): Map<string, Type.IApiItem> {
        
        const apiListData = this.getApiListData(this.companyId);
        return apiListData.itemsMap;
    }

    public getApi(apiId: string): Type.IApiItem | undefined {
        return this.getApiList().get(apiId);
    }

    public getNode(nodeId: string) {
        return this.workmap.get(nodeId);
    }

    public selectApi(apiId: string, nodeId: string): boolean {
        
        let bRet = false;
        
        const apiDetail = this.getApi(apiId);
        const workNode = this.workmap.get(nodeId);
        const work = workNode?.value;

        if(apiDetail && work && work.api) {
            
            work.api.apiId = apiId;
            work.api.apiName = apiDetail.apiName;
            
            //clear params
            work.clearParams();

            //register params
            const dataElements = apiDetail.dataElementList;
            for(let dataElement of dataElements) {
                
                const param = 
                    new WorkModel.CRequest(
                        dataElement.attributeName, 
                        dataElement.displaySequence, 
                        "", 
                        ParamSrcType[ParamSrcType.INPUTDATA]
                    );
                work.addRequest(param.id, param);
            }

            // const responseElements = apiDetail.dataElementList;
            // for(let dataElement of responseElements) {
                
            //     const param = 
            //         new WorkModel.CResponse(
            //             dataElement.attributeName, 
            //             dataElement.displaySequence, 
            //             ""
            //         );
            //     workNode.addResponse(param.id, param);
            // }
            workNode.gotoState(ENM_FLOW_STATE.EDIT);
            bRet = true;
        }
        return bRet;
    }
}

export {
    CWorkflow as Workflow,
};