import { Method } from 'axios';
import request from './utils/http';
import Api from "./config/api";
import { verifyToken } from './utils/jwtHelper';
import storageHelper from "./utils/storageHelper";

import WorkflowSevice from "./services/WorkflowService";
import CallService from "./services/CallService";
import { access } from 'fs';
import axios from "axios";

export const getAccessToken = (isForceToRefreshToken = false): Promise<string> => {
  return new Promise(resolve => {
    const localToken = storageHelper.getToken();
    if (localToken && verifyToken(localToken) && !isForceToRefreshToken) {
      resolve(localToken);
    } else {
      axios.post(Api.tokenURL, null, {
        params: {
          grant_type:'client_credentials',
          client_id:'530bdecu0p42d035svchbns59m',
          client_secret:'1r0fsgeklfop7lp7o1iejs5p07v5br44fqbtb302rcsc7m5fdodn'
        }
      })
      .then((response: any) => {
        if (response && response.status == 200) {
          storageHelper.setToken(response.data.access_token);
          resolve(response.data.access_token);
        } else {
          storageHelper.clearStorage();
          resolve("");
        }
      })
      .catch(() => {
        storageHelper.clearStorage();
        resolve("");
      });
    }
  });
};

/*
    name : apiCall
    function : 
        the wrapper function for http post.
    parameters :
        apiURL      :   the URL of API to call
        httpMethod  :   the http post method ('get', 'post', 'patch', 'delete')
        params      :   the parameters of API       
    description :
        this function is using for all API calling.
*/
export const apiCall = (apiURL: any, httpMethod: any, params: any) => {
  return new Promise((resolve, reject) => {
    getAccessToken()
    .then(
      () => {
      request({
        url: apiURL,
        method: httpMethod,
        params: params,
        timeout: 15000, // Wait for 5 seconds
      })
      .then(response => {
        console.log("[RES] resolve response", response);
        if (response && response.status == 200) {
          resolve(response.data);
        } else if (response && response.status == 204) {  //Empty Content
          console.log("[ERR] 204 response - empty content");
          resolve("");
        } else if (response && response.status == 404) {
          console.log("[ERR] 404 response");
          resolve(response.data);
        } else {
          console.log("[ERR] unknown response");
          reject(response.data);
        }
      })
      .catch(err => {
        console.log("getting reject", err);

        if (err && err.response && err.response.data && err.response.data.message) {
          reject({ message: err.response.data.message });
        } else {
          reject({ message: 'Unknown error. Please contact the administrator' });
        }
      });
    });
  });
};

export { WorkflowSevice, CallService};

