import { frontendAPI, API_PATH } from '../api';

export const createPayOne = async (payload) =>
  await frontendAPI.post(`/api/${API_PATH}/pay/${payload}`);
