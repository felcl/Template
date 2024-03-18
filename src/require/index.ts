import { baseURL } from '../config'

import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from "axios";
  
  const config = {
    baseURL: baseURL,
    timeout: 10000,
    withCredentials: true,
    headers: {},
  };
  
  class RequestHttp {
    service: AxiosInstance;
  
    constructor() {
      this.service = axios.create(config);
  
      /**
       * @description 请求拦截器
       */
      this.service.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          return config;
        }
      );
  
      /**
       * @description 响应拦截器
       */
      this.service.interceptors.response.use(
        (response: AxiosResponse) => {
          const { data } = response;
          return data;
        },
  
        (error: AxiosError) => {
          const { response } = error;
          if (response) {
            checkStatus(response.status);
          }
          return false;
        }
      );
    }
  
    // 常用请求方法封装
    get(url: string, params?: object, _object = {}) {
      return this.service.get(url, { params, ..._object });
    }
    post(url: string, params?: object, _object = {}) {
      return this.service.post(url, params, _object);
    }
    put(url: string, params?: object, _object = {}) {
      return this.service.put(url, params, _object);
    }
    delete(url: string, params?: unknown, _object = {}) {
      return this.service.delete(url, { params, ..._object });
    }
  }
  
  /**
   * @description: 校验网络请求状态码
   * @param {Number} status
   * @return void
   */
   const checkStatus = (status: number): void => {
    switch (status) {
        case 404:
            console.warn("资源不存在！");
            break;
        case 405:
            console.warn("请求方式错误！");
            break;
        case 500:
            console.warn("服务器异常！");
            break;
        default:
            console.warn("请求失败！");
    }
  };
  
  const request = new RequestHttp();
  export default request;
  