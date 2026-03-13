import { adminAPI, API_PATH } from '../api';

export const uploadAdminProductImage = async (formData) =>
  await adminAPI.post(`/api/${API_PATH}/admin/upload`, formData);
