import axios from "axios";
// import https from "https";
// import store from "../store";
import Api from "../config/api";

const service = axios.create({
  baseURL: Api.baseURL,
  headers: {
    "Content-Type": "application/json",
    // "x-api-key": process.env.REACT_APP_X_API_KEY as string,
    // "X-Requested-With": "XMLHttpRequest"
  },
  // withCredentials: true,
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false
  // })
});

service.interceptors.request.use(
  config => {
    // if (config.url !== "/api/login" && config.url !== "/api/reset-password") {
    //   let token = JSON.parse( localStorage.getItem("token") ?? "{}");
    //   if (token) {
    //     config.headers[
    //       "Authorization"
    //     ] = `${token.token_type} ${token.access_token}`;
    //   }
    // }
    // if (
    //   config.url === "/api/csv_down"
    // ) {
    //   config.responseType = "blob";
    //   console.log("config==>", config);
    // }
    return config;
  },
  error => {
    console.log("pre_Req_error==>", error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const statusCode = response.status;
    const { url } = response.config;
    if (url === "/api/login" && statusCode === 200) {
      localStorage.setItem("token", JSON.stringify(response.data.data));
      // store.commit("auth/SET_AUTHENTICATED", true);
      // store.commit("auth/SET_USER", response.data.data.user_info);
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
  // Error => {
  //   console.log("pre_Error===>", Error);
  // }
);

export default service;
