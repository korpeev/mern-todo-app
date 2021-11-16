import { Auth } from "./../types/AuthResponse";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
  }
);
api.interceptors.response.use(
  (config: AxiosResponse) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.get<Auth>(
          "http://localhost:5000/api/refresh",
          { withCredentials: true }
        );
        localStorage.setItem("token", data.accesToken);
        return api.request(originalRequest);
      } catch (error) {}
    }
    throw error;
  }
);
export default api;
