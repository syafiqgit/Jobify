import axios from "axios";

let bearerToken = "";
const customFetch = axios.create();

export const setTokenConfig = (token: string) => {
  bearerToken = token;
};

customFetch.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = "/api/v1";
  axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;
  return axiosConfig;
});

export default customFetch;
