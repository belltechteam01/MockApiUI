import * as Types from "../../types";
import {WorkflowSettings} from "../../settings";
import {Events, EVENT_CODE} from "../../events";
import { CEdgeMap as EdgeMap} from "../../edgemap"
import { v4 as uuidv4 } from 'uuid';
import {WorkflowSevice} from "services/api";

export enum ENM_FLOWTYPE {
    I0_O1,
    I0_O2,
    I1_O0,
    I1_O1,
    I1_O2,
    I2_O1,

}

export enum ENM_FLOW_STATE {
  INITIALIZING,
  EDIT, 
  VALIDATE,
  RUN,
}

export enum ENM_VALIDATE_SUBSTATE {
  START,
  VALIDATING,
  VALIDATED,
  VALIDATION_FAILED,
}

export enum ENM_RUN_SUBSTATE {
  READY,
  RUNNING,
  TERMINATED_SUCCESS,
  TERMINATED_FAIL
}

export enum ENM_EDIT_SUBSTATE {
  INIT_PARAM,
  EDITED,
  VALIDATE_FALIED,
}

export class CWorkNode<T extends {id: string}> {
    id: string;
    value: T;
    flowType: ENM_FLOWTYPE;
    
    nexts: CWorkNode<T>[];
    prevs: CWorkNode<T>[];
    condition?: boolean;

    sources: EdgeMap<Types.IEdge>;
    targets: EdgeMap<Types.IEdge>;
  
    state: ENM_FLOW_STATE;
    subState: number;

    events: Events;

    constructor(val: T , type?: ENM_FLOWTYPE) {
      
      this.state = 0;
      this.subState = 0;

      this.id = uuidv4();
      val.id = this.id;
      this.value = val;
      this.flowType = type ?? ENM_FLOWTYPE.I0_O1;
      
      this.nexts = [];
      this.prevs = [];

      this.sources = new EdgeMap();
      this.targets = new EdgeMap();
      
      this.events = new Events();

      this.gotoState(ENM_FLOW_STATE.INITIALIZING);
    }

    public getInstance() : T {
      return this.value;
    }

    public getEdges(isSrc = false) : EdgeMap<Types.IEdge> {
      if(isSrc)
        return this.sources;
      else
        return this.targets;
    }
    
    private updateEditState(subState: ENM_EDIT_SUBSTATE=0) {
      let _state = subState;
      this.subState = subState;
      return _state;
    }

    private updateValidateState(subState: ENM_VALIDATE_SUBSTATE=0) {
      let _state = subState;

      this.subState = subState;
      
      return _state;
    }

    private updateRunState(subState: ENM_RUN_SUBSTATE=0) {

      let _state = subState;

      this.subState = subState;

      return _state;
    }

    private isValidConnection() {
      return true;
    }
    
    public gotoState(state: ENM_FLOW_STATE, subState: number=0) : boolean {
      let bRet = false;

      const nRetry = 10;
      var i = 0, bResult = true;
      
      while (i < nRetry && bResult) {
        bResult = this.updateState(state, subState);
        i++;
      }

      bRet = (i !== nRetry);
      
      if(!bRet) {
        console.log("[ERR] developer check - state flow");
      }

      return bRet;
    }

    public updateState(state: ENM_FLOW_STATE, subState: number=0) {

      var shouldBeRecursive = false;
      // console.log("[STATE] current state(" + this.state + ") update state(" + state + ")");
      switch(this.state) {
        case ENM_FLOW_STATE.INITIALIZING: {

          // console.log("[STATE] INITIALIZING - subState(" + subState + ")");
          if(state == ENM_FLOW_STATE.EDIT) {
            this.state = ENM_FLOW_STATE.EDIT;
            this.subState = ENM_EDIT_SUBSTATE.INIT_PARAM;
            shouldBeRecursive = true;
          }          
        }
        break;
        case ENM_FLOW_STATE.EDIT: {

          // console.log("[STATE] EDIT - subState(" + subState + ")");
          this.subState = this.updateEditState(subState);
          switch(this.subState) {
            case ENM_EDIT_SUBSTATE.EDITED: {
              
              //simple validate for the connection
              if(this.isValidConnection()) {
                this.state = ENM_FLOW_STATE.VALIDATE;
                shouldBeRecursive = true;
              } else {
                this.updateEditState(ENM_EDIT_SUBSTATE.VALIDATE_FALIED);
              }
            }
            break;
            case ENM_EDIT_SUBSTATE.VALIDATE_FALIED: {
              
              //emit event - invalid connection
              this.events.invokeEventHandler(EVENT_CODE.NODE_CONNECTION_INVALID)

              //update substate
              this.updateEditState(ENM_EDIT_SUBSTATE.EDITED);
            }
            break;
          }
        }
        break;
        case ENM_FLOW_STATE.VALIDATE: {

          console.log("[STATE] VALIDATE - subState(" + subState + ")");
          this.subState = this.updateValidateState(subState);
          switch(this.subState) {
            case ENM_VALIDATE_SUBSTATE.VALIDATED: {

              this.state = ENM_FLOW_STATE.RUN;
              shouldBeRecursive = true;
            } 
            break;
            case ENM_VALIDATE_SUBSTATE.VALIDATION_FAILED: {

              //emit event - failed workflow validation (error_code)
              this.events.invokeEventHandler(EVENT_CODE.WORKFLOW_VALIDATION_FAIL)
              //
              this.state = ENM_FLOW_STATE.EDIT;
              shouldBeRecursive = true;
            }
            break;
          }
        }
        break;
        case ENM_FLOW_STATE.RUN: {

          console.log("[STATE] RUN - subState(" + subState + ")");
          this.subState = this.updateRunState(subState);
          switch(this.subState) {
            case ENM_RUN_SUBSTATE.TERMINATED_SUCCESS: {

              //emit event - success run workflow
              this.events.invokeEventHandler(EVENT_CODE.WORKFLOW_RUN_SUCCESS);

              //goto edit state
              this.state = ENM_FLOW_STATE.EDIT;
              this.subState = 0;

            } break;
            case ENM_RUN_SUBSTATE.TERMINATED_FAIL: {

              //emit event - failed run workflow - error_code
              this.events.invokeEventHandler(EVENT_CODE.WORKFLOW_RUN_FAILED);

              //goto edit state
              this.state = ENM_FLOW_STATE.EDIT;
              this.subState = 0;
            } break;
          }
        }
        break;
      }

      return shouldBeRecursive;
    }

    public getFirstEdge(isSrc = false): Types.IEdge {
      let edges : EdgeMap<Types.IEdge>;
      if(isSrc)
        edges = this.sources;
      else
        edges = this.targets;
      
      let ret = edges.getFirst();
      if(!ret) {
        ret = edges.append({id:"", source: "", target: ""});
      }
      
      return ret;
    }

    public getSecondEdge(isSrc = false): Types.IEdge {
      let edges : EdgeMap<Types.IEdge>;
      if(isSrc)
        edges = this.sources;
      else
        edges = this.targets;

      let ret = edges.getSecond();
      if(!ret) {
        ret = edges.append({id:"", source: "", target: ""});
        if(edges.size < 2) {
          ret = edges.append({id:"", source: "", target: ""});
        }
      }
      
      return ret;
    }

    public getEdgeAll(): Types.IEdge[] {
      var ret = Array();
      for(var edges of this.sources.getMap().values()) {
        ret.push(edges);
      }
      for(var edges of this.targets.getMap().values()) {
        ret.push(edges);
      }
      return ret;
    }
  }