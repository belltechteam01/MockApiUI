import { apiCall } from "../..";
import {testData} from "../testdata";

const getCustomerDetails = async () => {
    let apiURL = '/test/api-folder/v101/1';
    let httpMethod = 'get';
    return testData;
    // return await apiCall(apiURL, httpMethod, {});
};

const getAll = async () => {
    let apiURL = '/v100/workflow/body';
    let httpMethod = 'get';
    return await apiCall(apiURL, httpMethod, {});
}

const get = async (itemId: string | number) => {
    let apiURL = '/v100/workflow/body/' + itemId;
    let httpMethod = 'get';
    return await apiCall(apiURL, httpMethod, {});
}

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
    getCustomerDetails,
    getAll,
    get,
    add,
    edit,
    del
};
  
