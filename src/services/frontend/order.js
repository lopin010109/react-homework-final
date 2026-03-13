import { frontendAPI, API_PATH } from '../api';

export const createOrderOne = async (payload) =>
  await frontendAPI.post(`/api/${API_PATH}/order`, payload);

export const fetchOrderListAll = async (payload) =>
  await frontendAPI.get(`/api/${API_PATH}/orders?${payload}`);

export const fetchOrderListOne = async (payload) =>
  await frontendAPI.get(`/api/${API_PATH}/order/${payload}`);
