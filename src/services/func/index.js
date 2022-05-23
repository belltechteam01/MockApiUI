import { apiCall } from '../index';

const pullFuncs = (params = {}) => {
  let apiURL = '/api/funcs';
  let httpMethod = 'get';
  return apiCall(apiURL, httpMethod, params);
};

const pullFunc = funcID => {
  let apiURL = '/api/func/' + funcID;
  let httpMethod = 'get';
  return apiCall(apiURL, httpMethod, {});
};

const addFunc = (params = {}) => {
  let apiURL = '/api/funcs';
  let httpMethod = 'post';
  let arrParams = {
    name: params.name,
    desc: params.description,
    func_id:params.funcID
  };

  return apiCall(apiURL, httpMethod, arrParams);
};

const deleteFunc = funcID => {
  let apiURL = '/api/funcs/' + funcID;
  let httpMethod = 'delete';
  return apiCall(apiURL, httpMethod, {});
};

const editFunc = (params, funcID) => {
  let apiURL = '/api/funcs/' + funcID;
  let httpMethod = 'put';
  let arrParams = {
    name: params.name,
    desc: params.description,
    district_id:params.nDistrictID
  };
  return apiCall(apiURL, httpMethod, arrParams);
};

export default {
  pullFuncs,
  pullFunc,
  addFunc,
  deleteFunc,
  editFunc,
};
