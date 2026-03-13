import { adminAPI, API_PATH } from '../api';

export const fetchAdminProductListAll = async () =>
  await adminAPI.get(`/api/${API_PATH}/admin/products/all`);

export const fetchAdminProductList = async (payload) =>
  await adminAPI.get(`/api/${API_PATH}/admin/products?${payload}`);

export const fetchAdminProductOne = async (payload) =>
  await adminAPI.post(`/api/${API_PATH}/admin/product`, payload);

export const updateAdminProduct = async (id, payload) =>
  await adminAPI.put(`/api/${API_PATH}/admin/product/${id}`, payload);

export const deleteAdminProduct = async (payload) =>
  await adminAPI.delete(`/api/${API_PATH}/admin/product/${payload}`);
