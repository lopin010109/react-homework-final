import { frontendAPI, API_PATH } from '../api';

export const fetchExchangeCoupon = async (payload) =>
  await frontendAPI.post(`/api/${API_PATH}/coupon`, payload);
