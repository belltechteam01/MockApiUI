import axios, { AxiosInstance } from "axios";

const AWS_ENDPOINT = "https://90dhrtmj9l.execute-api.us-east-1.amazonaws.com";
const SMSJOURNEY_ENDPOINT = "https://smsjourney.justotp.com";
const AUTH_ENDPOINT = "https://auth.justotp.com";
const DEV_ENDPOINT = "https://ddcz10eful.execute-api.us-east-1.amazonaws.com";

const apiClient = (endpoint = AWS_ENDPOINT): AxiosInstance => {
  const defaultOptions = {
    baseURL: endpoint,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.REACT_APP_X_API_KEY as string,
      // "Access-Control-Allow-Origin": "*",
    },
  };

  return axios.create(defaultOptions);
};

export const awsApi = apiClient(AWS_ENDPOINT);
export const smsJourneyApi = apiClient(SMSJOURNEY_ENDPOINT);
export const authApi = apiClient(AUTH_ENDPOINT);
export const devApi = apiClient(DEV_ENDPOINT);
