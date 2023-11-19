import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios";

class BaseService {
  url = "";

  constructor(path: string) {
    this.url += `${path}`;
  }

  get(path: string, config?: AxiosRequestConfig<any> | undefined) {
    return axiosInstance.get(`${this.url}/${path}`, config);
  }

  post(path: string, data?: AxiosRequestConfig<any>["data"] | undefined, config?: AxiosRequestConfig<any> | undefined) {
    return axiosInstance.post(`${this.url}/${path}`, data, config);
  }

  put(path: string, data?: AxiosRequestConfig<any>["data"] | undefined, config?: AxiosRequestConfig<any> | undefined) {
    return axiosInstance.put(`${this.url}/${path}`, data, config);
  }

  delete(path: string, config?: AxiosRequestConfig<any> | undefined) {
    return axiosInstance.delete(`${this.url}/${path}`, config);
  }

  create<t = any>(item: t) {
    return this.post("create", item);
  }

  update<t = any>(item: t) {
    return this.put("update", item);
  }
}

export default BaseService;
