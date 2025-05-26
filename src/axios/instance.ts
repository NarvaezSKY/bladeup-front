import axios, { AxiosInstance } from "axios";
import { BACKEND_URL } from "./config";
import { responseInterceptor, responseInterceptorError } from "./interceptors";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Accept: '*/*',
  },
  timeout: 1000000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(responseInterceptor, responseInterceptorError);

export default axiosInstance;
