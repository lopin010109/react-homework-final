import { adminAPI, API_PATH } from '../api';

export const createAdminCouponOne = async (payload) =>
  await adminAPI.post(`/api/${API_PATH}/admin/coupon`, payload);

export const updateAdminCouponOne = async (id, payload) =>
  await adminAPI.put(`/api/${API_PATH}/admin/coupon/${id}`, payload);

export const deleteAdminCouponOne = async (payload) =>
  await adminAPI.delete(`/api/${API_PATH}/admin/coupon/${payload}`);

export const fetchAdminCouponList = async (payload) =>
  await adminAPI.get(`/api/${API_PATH}/admin/coupons?${payload}`);
