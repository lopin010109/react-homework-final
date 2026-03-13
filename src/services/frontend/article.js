import { frontendAPI, API_PATH } from '../api';

export const createArticleList = async (payload) =>
  await frontendAPI.post(`/api/${API_PATH}/articles?${payload}`);

export const createArticleOne = async (payload) =>
  await frontendAPI.post(`/api/${API_PATH}/article/${payload}`);
