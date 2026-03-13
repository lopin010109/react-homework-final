import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tryAsync } from '../utils/tryAsync';
import {
  deleteAdminProduct,
  fetchAdminProductList,
  updateAdminProduct,
  fetchAdminProductOne,
} from '../services/admin/product';
import { uploadAdminProductImage } from '../services/admin/image';

export const adminProductSlice = createSlice({
  name: 'adminProduct',
  initialState: {
    initAdminProduct: {
      id: '',
      title: '',
      category: '',
      origin_price: 0,
      price: 0,
      unit: '',
      description: '',
      content: '',
      is_enabled: false,
      imageUrl: '',
      imagesUrl: [],
      // 自定義擴充欄位
      rate: 0,
      made: '',
      base: '',
      aroma: '',
    },
    adminProductList: [],
    mainImageUrl: '',
    adminProductPagination: {
      total_pages: 1,
      current_page: 1,
      has_pre: false,
      has_next: false,
      category: '',
    },
    paginationPosition: 'end',
  },
  reducers: {
    setAdminProductList(state, actions) {
      state.adminProductList = actions.payload;
    },
    setMainImageUrl(state, actions) {
      state.mainImageUrl = actions.payload;
    },
    setAdminProductPagination(state, actions) {
      state.adminProductPagination = actions.payload;
    },
  },
});

export const fetchAsyncAdminProductList = createAsyncThunk(
  'adminProduct/fetchAsyncAdminProductList',
  async (payload, ctx) => {
    let query = `page=${payload?.page}&category=${payload?.category || ''}`;

    const res = await tryAsync(fetchAdminProductList(query));
    ctx.dispatch(setAdminProductList(res?.data?.products));
    ctx.dispatch(setAdminProductPagination(res?.data?.pagination));
  },
);

export const deleteAsyncAdminProductOne = createAsyncThunk(
  'adminProduct/deleteAsyncAdminProductOne',
  async (payload, ctx) => {
    await tryAsync(deleteAdminProduct(payload));
    ctx.dispatch(fetchAsyncAdminProductList());
  },
);

export const updateAsyncAdminProductOne = createAsyncThunk(
  'adminProduct/updateAsyncAdminProductOne',
  async (payload, ctx) => {
    await tryAsync(updateAdminProduct(payload.id, { data: payload.data }));
    ctx.dispatch(fetchAsyncAdminProductList());
  },
);

export const createAsyncAdminProductOne = createAsyncThunk(
  'adminProduct/createAsyncAdminProductOne',
  async (payload, ctx) => {
    await tryAsync(fetchAdminProductOne({ data: payload.data }));
    ctx.dispatch(fetchAsyncAdminProductList());
  },
);

export const uploadAsyncAdminProductImage = createAsyncThunk(
  'adminProduct/uploadAsyncAdminProductImage',
  async (payload, ctx) => {
    const { data } = await tryAsync(uploadAdminProductImage(payload));
    ctx.dispatch(setMainImageUrl(data.imageUrl));
  },
);

export const {
  setAdminProductList,
  setMainImageUrl,
  setAdminProductPagination,
} = adminProductSlice.actions;

export default adminProductSlice.reducer;
