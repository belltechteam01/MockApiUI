import {WorkflowSettings} from "../../settings";
import {Events, EVENT_CODE} from "../../events";
import { v4 as uuidv4 } from 'uuid';

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
    type: ENM_FLOWTYPE;
    
    nexts: CWorkNode<T>[];
    prevs: CWorkNode<T>[];
    condition?: boolean;
  
    state: ENM_FLOW_STATE;
    subState: number;

    events: Events;

    constructor(val: T , type?: ENM_FLOWTYPE) {
      
      this.state = 0;
      this.subState = 0;

      this.id = uuidv4();
      val.id = this.id;
      this.value = val;
      this.type = type ?? ENM_FLOWTYPE.I0_O1;
      
      this.nexts = [];
      this.prevs = [];

      this.events = new Events();

      this.updateState(ENM_FLOW_STATE.INITIALIZING);
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

    public updateState(state: ENM_FLOW_STATE, subState: number=0) {

      let shouldBeRecursive = false;

      switch(this.state) {
        case ENM_FLOW_STATE.INITIALIZING: {

          if(state == ENM_FLOW_STATE.EDIT) {
            this.state = ENM_FLOW_STATE.EDIT;
            this.subState = ENM_EDIT_SUBSTATE.INIT_PARAM;
          }          
        }
        break;
        case ENM_FLOW_STATE.EDIT: {

          this.subState = this.updateEditState(subState);
          switch(this.subState) {
            case ENM_EDIT_SUBSTATE.EDITED: {
              
              //simple validate for the connection
              if(this.isValidConnection()) {
                this.updateEditState(ENM_EDIT_SUBSTATE.VALIDATE_FALIED);
              } else {
                this.state = ENM_FLOW_STATE.VALIDATE;
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
          this.subState = this.updateValidateState(subState);
          switch(this.subState) {
            case ENM_VALIDATE_SUBSTATE.VALIDATED: {
              this.state = ENM_FLOW_STATE.RUN;
            } break;
            case ENM_VALIDATE_SUBSTATE.VALIDATION_FAILED: {

              //emit event - failed workflow validation (error_code)
              this.events.invokeEventHandler(EVENT_CODE.WORKFLOW_VALIDATION_FAIL)
              //
              this.state = ENM_FLOW_STATE.EDIT;

            } break;
          }
        }
        break;
        case ENM_FLOW_STATE.RUN: {
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
  }