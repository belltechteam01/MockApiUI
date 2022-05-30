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
  STATUS_FAILURE_CODES
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
    apiId: string=""
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
                const requestData = flowStep.apiDetails.requestData;
                
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
                const responseData = flowStep.apiDetails.outputData;
                
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
    }
    
    return ret;
}

export const getAttr = (data: Object, keys: string[]): any => {
    
    if(!data || typeof data != "object") return false;
    if(!data.hasOwnProperty(keys[0])) return false;

    if(keys.length < 2) {
        return data;
    } else {
        const key = keys.shift();
        if(!key) return false;

        return getAttr(data[key], keys);
    }    
}