import { apiCall } from "../..";

const getAll = async (params = {}) => {
  let apiURL = '/v100/workflow/funcs';
  let httpMethod = 'get';
  return await apiCall(apiURL, httpMethod, params);
};

const get = async(funcID: any) => {
  let apiURL = '/v100/workflow/funcs/' + funcID;
  let httpMethod = 'get';
  return await apiCall(apiURL, httpMethod, {});
};

const add = async (params: any = {}) => {
  let apiURL = '/v100/workflow/funcs';
  let httpMethod = 'post';
  let arrParams = {
    name: params.name,
    desc: params.description,
    func_id:params.funcId
  };

  return await apiCall(apiURL, httpMethod, arrParams);
};

const del = async (funcId: string | number) => {
  let apiURL = '/v100/workflow/funcs/' + funcId;
  let httpMethod = 'delete';
  return await apiCall(apiURL, httpMethod, {});
};

const edit = async (params: any, funcID: string | number) => {
  let apiURL = '/v100/workflow/funcs/' + funcID;
  let httpMethod = 'put';
  let arrParams = {
    name: params.name,
    desc: params.description,
    func_id:params.funcId
  };
  return await apiCall(apiURL, httpMethod, arrParams);
};

export default {
  getAll,
  get,
  add,
  del,
  edit,
};
