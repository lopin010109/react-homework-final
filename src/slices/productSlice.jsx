import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tryAsync } from '../utils/tryAsync';
import {
  fetchProductList,
  fetchProductListAll,
  fetchProductOne,
} from '../services/frontend/product';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    initProduct: {
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
      // 補充
      rate: '',
    },
    productAllList: [],
    productList: [],
    productPagination: {
      total_pages: 1,
      current_page: 1,
      has_pre: false,
      has_next: false,
      category: '',
    },
    categoryList: [],
    paginationPosition: 'center',
  },
  reducers: {
    setProductList(state, actions) {
      state.productList = actions.payload;
    },
    setProductPagination(state, actions) {
      state.productPagination = actions.payload;
    },
    setProductOne(state, actions) {
      state.initProduct = actions.payload;
    },
    setCategoryList(state, actions) {
      state.categoryList = actions.payload;
    },
    setProductAllList(state, actions) {
      state.productAllList = actions.payload;
    },
  },
});

export const fetchAsyncProductList = createAsyncThunk(
  'product/fetchAsyncProductList',
  async (payload, ctx) => {
    let query = `page=${payload?.page}&category=${payload?.category || ''}`;
    const res = await tryAsync(fetchProductList(query), ctx);

    const products = res?.data?.products;
    ctx.dispatch(setProductList(products));
    ctx.dispatch(setProductPagination(res?.data?.pagination));
  },
);

export const fetchAsyncProductOne = createAsyncThunk(
  'product/fetchAsyncProductOne',
  async (payload, ctx) => {
    const res = await tryAsync(fetchProductOne(payload));
    ctx.dispatch(setProductOne(res?.data?.product));
  },
);

// 這支拿來 map categoryList 使用
export const fetchAsyncProductAll = createAsyncThunk(
  'product/fetchAsyncProductAll',
  async (_, ctx) => {
    const res = await tryAsync(fetchProductListAll());
    const products = res?.data?.products;
    ctx.dispatch(setProductAllList(products));

    const categoryTypes = [
      '全部',
      ...new Set(products.map((item) => item.category)),
    ];
    ctx.dispatch(setCategoryList(categoryTypes));
  },
);

export const {
  setProductList,
  setProductPagination,
  setProductOne,
  setCategoryList,
  setProductAllList,
} = productSlice.actions;

export default productSlice.reducer;
