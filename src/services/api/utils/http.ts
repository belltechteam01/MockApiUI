import axios, { AxiosInstance } from "axios";
import Api from "../config/api";
import storageHelper from "./storageHelper";

const defaultOptions = {
  baseURL: Api.baseURL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "AggWBoyh9g1wQe4YHDyYy3umN9n71wXm8WC8JqTM",
  },
};

const service: AxiosInstance = axios.create(defaultOptions);

service.interceptors.request.use(
  (config: any) => {

    const token = storageHelper.getToken();

    config.headers[
      "Authorization"
    ] = token ? `Bearer ${token}`: "";

    console.log("[REQ] config", config);
    return config;
  },
  error => {
    console.log("pre_Req_error==>", error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    console.log("[LOG] response", response);
    const statusCode = response.status;
    const { url } = response.config;
    if (url === "/api/login" && statusCode === 200) {
    }
    return response;
  },
  error => {
    console.log("pre_error===>", error.response);
    // const statusCode = error.response.status;

    // const { url } = error.config;

    // if (
    //   (url !== "/api/auth/info" &&
    //     (statusCode === 401 || statusCode === 403 || statusCode === 419)) ||
    //   (url !== "/api/login" &&
    //     (statusCode === 401 || statusCode === 403 || statusCode === 419))
    // ) {
    //   console.log("===!!!!====");
    //   if (statusCode === 401) {
    //     error.response.data.message =
    //       "These credentials do not match our records.";
    //   }
    //   // store.dispatch("auth/attemptLogin");
    // }

    return Promise.reject(error);
  },
);

export default service;
