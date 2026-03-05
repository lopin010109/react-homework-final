import axios from 'axios';
import { cookieUtil } from '../utils/storage';

export const API_BASE = import.meta.env.VITE_API_BASE;
export const API_PATH = import.meta.env.VITE_API_PATH;

// --- 前台 ---
export const frontendAPI = axios.create({
  baseURL: API_BASE,
});

// 前台 - 請求攔截器
frontendAPI.interceptors.request.use(
  (config) => {
    return config;
  },
  // 錯誤處理
  (error) => {
    return Promise.reject(error);
  },
);

// 前台 - 回應攔截器
frontendAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      console.log(response);
      // store.dispatch(createAsyncMessage(response.data));
    } else if (response?.status >= 500) {
      // store.dispatch(
      //   createAsyncMessage({
      //     success: false,
      //     message: "伺服器錯誤，請稍後再試",
      //   }),
      // );
    }

    return Promise.reject(error);
  },
);

// --- 後台 ---
export const adminAPI = axios.create({
  baseURL: API_BASE,
});

// 後台 - 請求攔截器
adminAPI.interceptors.request.use(
  (config) => {
    const token = cookieUtil.get('hexTokenFHW');
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 後台 - 回應攔截器
adminAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
