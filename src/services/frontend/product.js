import { frontendAPI, API_PATH } from '../api';

export const fetchProductListAll = async () =>
  await frontendAPI.get(`/api/${API_PATH}/products/all`);

export const fetchProductList = async (payload) =>
  await frontendAPI.get(`/api/${API_PATH}/products?${payload}`);

export const fetchProductOne = async (payload) =>
  await frontendAPI.get(`/api/${API_PATH}/product/${payload}`);
