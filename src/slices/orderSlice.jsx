import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tryAsync } from '../utils/tryAsync';
import {
  createOrderOne,
  fetchOrderListAll,
  fetchOrderListOne,
} from '../services/frontend/order';
import { createAsyncPayOne } from './paySlice';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderId: '',
    orderOne: {},
    orderList: [],
    orderPagination: {
      total_pages: 1,
      current_page: 1,
      has_pre: false,
      has_next: false,
      category: '',
    },
    paginationPosition: 'end',
  },
  reducers: {
    setOrderList(state, actions) {
      state.orderList = actions.payload;
    },
    setOrderPagination(state, actions) {
      state.orderPagination = actions.payload;
    },
    setOrderOne(state, actions) {
      state.orderOne = actions.payload;
    },
    setOrderId(state, actions) {
      state.orderId = actions.payload;
    },
  },
});

export const fetchAsyncOrderList = createAsyncThunk(
  'order/fetchAsyncOrderList',
  async (payload, ctx) => {
    const res = await tryAsync(fetchOrderListAll(payload));
    ctx.dispatch(setOrderList(res?.data?.orders));
    ctx.dispatch(setOrderPagination(res?.data?.pagination));
  },
);

export const fetchAsyncOrderOne = createAsyncThunk(
  'order/fetchAsyncOrderOne',
  async (payload, ctx) => {
    const res = await tryAsync(fetchOrderListOne(payload));
    ctx.dispatch(setOrderOne(res?.data?.order));
  },
);

export const createAsyncOrderOne = createAsyncThunk(
  'order/createAsyncOrderOne',
  async (payload, ctx) => {
    const res = await tryAsync(
      createOrderOne({ data: { user: { ...payload }, message: payload.memo } }),
    );
    ctx.dispatch(setOrderId(res?.data?.orderId));
    ctx.dispatch(createAsyncPayOne(res?.data?.orderId));
  },
);

export const { setOrderList, setOrderPagination, setOrderOne, setOrderId } =
  orderSlice.actions;

export default orderSlice.reducer;
