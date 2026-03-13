import { adminAPI, API_PATH } from '../api';

export const fetchAdminOrderList = async (payload) =>
  await adminAPI.get(`/api/${API_PATH}/admin/orders?${payload}`);

export const updateAdminOrderOne = async (id, payload) =>
  await adminAPI.put(`/api/${API_PATH}/admin/order/${id}`, payload);

export const deleteAdminOrderOne = async (payload) =>
  await adminAPI.delete(`/api/${API_PATH}/admin/order/${payload}`);

export const deleteAdminOrderAll = async () =>
  await adminAPI.delete(`/api/${API_PATH}/admin/orders/all`);
