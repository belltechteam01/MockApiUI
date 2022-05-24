import { Method } from 'axios';
import request from './utils/http';
import { verifyToken } from './utils/jwtHelper';
import storageHelper from "./utils/storageHelper";

import WorkflowSevice from "./services/WorkflowService";
import CallService from "./services/CallService";

export const getAccessToken = (isForceToRefreshToken = false): Promise<string> => {
  return new Promise(resolve => {
    const localToken = storageHelper.getToken();
    if (localToken && verifyToken(localToken) && !isForceToRefreshToken) {
      resolve(localToken);
    } else {
      const refreshToken = storageHelper.getRefreshToken();
      if (verifyToken(refreshToken)) {
        const params = {
          param_cmd: 'refreshToken',
          refresh_token: refreshToken, //current refresh token
        };
        request({
          url: '/refreshToken', //the url of API for getting new access token
          method: 'post',
          data: params,
          timeout: 15000, // Wait for 5 seconds
        })
          .then(response => {
            console.log(response);
            if (response && response.status == 200) {
              storageHelper.setToken(response.data);
            //   resolve(response.token);
            } else {
              storageHelper.clearStorage();
            //   resolve();
            }
          })
          .catch(() => {
            storageHelper.clearStorage();
            // resolve();
          });
      } else {
        storageHelper.clearStorage();
        // resolve();
      }
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
    // getAccessToken().then(accessToken => {
    //   if (accessToken && !params.token) {
    //     params.token = accessToken;
    //   }
    request({
      url: apiURL,
      method: httpMethod,
      params: params,
      timeout: 15000, // Wait for 5 seconds
    })
      .then(response => {
        if (response && response.status == 200) {
          if (response.data && response.data.result == true) {
            resolve(response.data.data);
          } else {
            if (response.data && response.data.message) {
              reject({ message: response.data.message });
            } else {
              reject({ message: 'Unknown error. Please contact the administrator' });
            }
          }
        } else if (response && response.status == 201) {  //Created
          if (response.data && response.data.result == true) {
            resolve(response.data.data);
          } else {
            if (response.data && response.data.message) {
              reject({ message: response.data.message });
            } else {
              reject({ message: 'Unknown error. Please contact the administrator' });
            }
          }
        } else if (response && response.status == 204) {  //Empty Content
          // resolve();
        } else if (response && response.status == 404) {
          resolve(response.data);
        } else {
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
    // });
  });
};

export { WorkflowSevice, CallService};

