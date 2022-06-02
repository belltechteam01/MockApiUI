import { apiCall } from "../..";
import {testData} from "../testdata";

const getAll = async (companyId: string) => {
    
    let apiURL = '/apiengine/api-engine/active/'+companyId;
    let httpMethod = 'GET';
    return await apiCall(apiURL, httpMethod, {});
};

const get = async (companyId: string, apiId: string) => {

    // let apiURL = '/apiengine/api-engine-details/'+companyId;
    const apiURL = '/apiengine/api-engine-details/' + companyId + "/" + apiId;
    const httpMethod = 'GET';
    return await apiCall(apiURL, httpMethod, {});
};

const add = async (params: any = {}) => {
    let apiURL = '/v100/workflow/body';
    let httpMethod = 'post';
    let arrParams = {
        name: params.name,
        desc: params.description,
        item_id:params.workflowId
    };
    return await apiCall(apiURL, httpMethod, arrParams);
}

const edit = async (params: any, itemId: string | number) => {
    let apiURL = '/v100/workflow/body';
    let httpMethod = 'post';
    let arrParams = {
        name: params.name,
        desc: params.description,
        item_id:itemId
    };
    return await apiCall(apiURL, httpMethod, arrParams);
}

const del = async (itemId: string | number) => {
    let apiURL = '/v100/workflow/body/' + itemId;
    let httpMethod = 'post';
    return await apiCall(apiURL, httpMethod, {});
}

export default {
    getAll,
    get,
    add,
    edit,
    del
};
  
