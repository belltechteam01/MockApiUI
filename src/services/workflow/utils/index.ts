import { cloneElement } from "react";
import * as Types from "services/workflow/types";

export const parseJson = (json: string): Object | boolean => {
    let ret: Object | boolean = false;
    try {
        ret = JSON.parse(json);
    } catch(error) {
        console.log("[ERROR] invalid json");
        console.log(json);
    }
    return ret;
}


export enum ENM_ParseType {
  FLOW,
  FLOW_STEPS,
  FLOW_STEP,
  API_DETAIL,
  API_REQUESTS,
  API_RESPONSES,
  STATUS_CODES,
  STATUS_SUCCESS_CODES,
  STATUS_FAILURE_CODES,
  API_RULE_DETAIS,
  API_RULE_INPUT,
  API_RULE_OUTPUT,
}

export const getFlowStep = (flow: Types.IFlow, flowId: string): Types.IFlowStep | null => {
    var ret: Types.IFlowStep | null = null;

    if(flow && flow.flowSteps.length > 0) {
        for(let flowStep of flow.flowSteps) {
            if(flowId == flowStep.flowStepId) {
                ret = flowStep;
                break;
            }
        }
    }

    return ret;
}
export const getRuleField = (fields: Types.IOutputDataItem[] | Types.IInputDataItem[], fieldId: string)
: Types.IInputDataItem | Types.IOutputDataItem | null => {

    var ret: Types.IInputDataItem | Types.IOutputDataItem | null = null;

    if(fields && fields.length > 0) {
        for(let itm of fields) {
            if(fieldId == itm.fieldId) {
                ret = itm;
                break;
            }
        }
    }

    return ret;
}

export const getApiDetail = (apiDetails: Types.IApiDetail[], apiId: string): Types.IApiDetail | null => {
    var ret: Types.IApiDetail | null = null;
    for(let apiDetail of apiDetails) {
        if(apiDetail.apiId == apiId) {
            ret = apiDetail;
            break;
        }
    }

    return ret;
}
export const parseFlowData = (
    data: Object, 
    toType: ENM_ParseType, 
    flowId: string, 
    flowStepId: string="", 
    apiId: string="",
    fieldId: string="",
): Object => {
    
    var ret: Object = {};
    
    if(!data) return ret;

    const flowData: Types.IFlow = data as Types.IFlow;

    if(toType == ENM_ParseType.FLOW) {

        if(flowData.flowId == flowId && flowData.flowSteps) {
            ret = flowData.flowSteps;
        }
    } else if(toType == ENM_ParseType.FLOW_STEP) {

        if(flowData.flowId == flowId) {
            let flowStep = getFlowStep(flowData, flowStepId);
            if(flowStep)
                ret = flowStep;
        }
    } else if(toType == ENM_ParseType.API_DETAIL) {
        
        if(flowData.flowId == flowId) {
            let flowStep = getFlowStep(flowData, flowStepId);
            // console.log("[LOG] parseFlowData", flowStep);
            if(flowStep && flowStep.apiDetails){
                ret = flowStep.apiDetails;
            }
        }
    } else if(toType == ENM_ParseType.API_REQUESTS) {
        
        if(flowData.flowId == flowId) {
            let flowStep = getFlowStep(flowData, flowStepId);
            // console.log("[LOG] parseFlowData", flowStepId);
            if(flowStep && flowStep.apiDetails){
                let requestData = flowStep.apiDetails.requestData;
                
                if(requestData){
                    ret = requestData;
                } 
            }
        }
    } else if(toType == ENM_ParseType.API_RESPONSES) {
        
        if(flowData.flowId == flowId) {
            let flowStep = getFlowStep(flowData, flowStepId);
            // console.log("[LOG] parseFlowData", flowStepId);
            if(flowStep && flowStep.apiDetails){
                let responseData = flowStep.apiDetails.outputData;
                
                if(responseData){
                    ret = responseData;
                } 
            }
        }
    } else if(toType == ENM_ParseType.STATUS_SUCCESS_CODES) {
        
        if(flowData.flowId == flowId) {
            let flowStep = getFlowStep(flowData, flowStepId);
            if(flowStep && flowStep.apiDetails){
                const successCodes = flowStep.apiDetails.successHttpCodes;
                
                if(successCodes){
                    ret = successCodes;
                } 
            }
        }
    } else if(toType == ENM_ParseType.STATUS_FAILURE_CODES) {
        
        if(flowData.flowId == flowId) {
            let flowStep = getFlowStep(flowData, flowStepId);
            if(flowStep && flowStep.apiDetails){
                const failureCodes = flowStep.apiDetails.faliureHttpCodes;
                
                if(failureCodes){
                    ret = failureCodes;
                } 
            }
        }
    } else if(toType == ENM_ParseType.STATUS_CODES) {
        
        if(flowData.flowId == flowId) {
            let flowStep = getFlowStep(flowData, flowStepId);
            if(flowStep && flowStep.apiDetails){
                const successCodes = flowStep.apiDetails.successHttpCodes;
                const failureCodes = flowStep.apiDetails.faliureHttpCodes;
                
                if(successCodes || failureCodes){
                    ret = {
                        successHttpCodes: successCodes,
                        failureHttpCodes: failureCodes
                    }
                } 
            }
        }
    } else if(toType == ENM_ParseType.API_RULE_DETAIS) {
        
        if(flowData.flowId == flowId) {
            let flowStep = getFlowStep(flowData, flowStepId);
            // console.log("[LOG] parseFlowData", flowStepId);
            if(flowStep && flowStep.rulesDetails){
                const ruleDetails = flowStep.rulesDetails;
                
                if(ruleDetails){
                    ret = ruleDetails;
                } 
            }
        }
    } else if(toType == ENM_ParseType.API_RULE_INPUT) {
        
        if(flowData.flowId == flowId) {
            let flowStep = getFlowStep(flowData, flowStepId);
            // console.log("[LOG] parseFlowData", flowStepId);
            if(flowStep && flowStep.rulesDetails){
                const ruleDetails = flowStep.rulesDetails;
                const ruleInput = getRuleField(flowStep.rulesDetails.inputData, fieldId);
                if(ruleInput){
                    ret = ruleInput;
                } 
            }
        }
    } else if(toType == ENM_ParseType.API_RULE_OUTPUT) {
        
        if(flowData.flowId == flowId) {
            let flowStep = getFlowStep(flowData, flowStepId);
            // console.log("[LOG] parseFlowData", flowStepId);
            if(flowStep && flowStep.rulesDetails){
                const ruleDetails = flowStep.rulesDetails;
                const ruleInput = getRuleField(flowStep.rulesDetails.outputData, fieldId);
                if(ruleInput){
                    ret = ruleInput;
                } 
            }
        }
    } 
    
    return ret;
}

const findItem = (items: Array<Object>, key: string, id: string): any => {
    var ret: any = null;
    for(let itm of items) {
        if(itm[key] == id) {
            ret = itm;
            break;
        }
    }

    return ret;
}
export const getAttr = (data: Object, keys: string[]): any => {
    
    if(!data || typeof data != "object") return false;
    if(!data.hasOwnProperty(keys[0])) return false;
    if(keys.length < 2) {
        return data;
    } else {
        let key = keys.shift();
        if(key == undefined) return false;
        
        var child = data[key];
        
        if( Array.isArray(data[key]) )
        {
            const idKey = keys.shift();
            if(idKey == undefined) return false;
            
            const itm = findItem(data[key], idKey, keys[0]);
            
            keys.shift();
            console.log("[LOG] keys", keys.length);
            if(keys.length == 0)
            return itm;
            
            child = itm;
        }

        return getAttr(child, keys);
    }    
}

export const copyFlowObject = (src: any, dest: any): boolean => {
    if(( typeof src === "object" || Array.isArray(src) ) && ( typeof dest === "object" || Array.isArray(dest) )) {

    }

    return true;
}