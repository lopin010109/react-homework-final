import { adminAPI } from '../api';

// 管理者後台
// 登入
export const fetchLogin = async (params) => {
  const { data } = await adminAPI.post('/admin/signin', params);
  return data;
};

// 登出
export const fetchLogout = async () => await adminAPI.post('/logout');

// 檢查是否登入
export const fetchCheckout = async () => {
  const { data } = await adminAPI.post('/api/user/check');

  return data;
};
