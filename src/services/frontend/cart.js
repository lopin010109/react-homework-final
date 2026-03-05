import { frontendAPI, API_PATH } from '../api';

export const createCartOne = async (payload) =>
  await frontendAPI.post(`/api/${API_PATH}/cart`, payload);

export const fetchCartList = async () =>
  await frontendAPI.get(`/api/${API_PATH}/cart`);

export const updateCartOne = async (id, payload) =>
  await frontendAPI.put(`/api/${API_PATH}/cart/${id}`, payload);

export const deleteCartOne = async (payload) =>
  await frontendAPI.delete(`/api/${API_PATH}/cart/${payload}`);

export const deleteCartAll = async () =>
  await frontendAPI.delete(`/api/${API_PATH}/carts`);
