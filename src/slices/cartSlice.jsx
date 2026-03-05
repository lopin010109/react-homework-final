import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tryAsync } from '../utils/tryAsync';
import {
  createCartOne,
  deleteCartOne,
  fetchCartList,
  updateCartOne,
} from '../services/frontend/cart';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartList: [],
  },
  reducers: {
    setCartList(state, actions) {
      state.cartList = actions.payload;
    },
    updateCartOneQty(state, actions) {
      const { product_id, qty } = actions.payload;
      const item = state.cartList?.data?.carts?.find(
        (item) => item.id === product_id,
      );
      if (item) item.qty = qty;
    },
  },
});

export const createAsyncCartOne = createAsyncThunk(
  'cart/createAsyncCartOne',
  async (payload, ctx) => {
    await tryAsync(
      createCartOne({
        data: { product_id: payload.product_id, qty: payload.qty },
      }),
    );
    ctx.dispatch(fetchAsyncCartList());
  },
);

export const fetchAsyncCartList = createAsyncThunk(
  'cart/fetchAsyncCartList',
  async (_, ctx) => {
    const res = await tryAsync(fetchCartList());
    ctx.dispatch(setCartList(res?.data));
  },
);

// map 資料中 要修改其中一筆
export const updateAsyncCartOne = createAsyncThunk(
  'cart/updateAsyncCartOne',
  async (payload, ctx) => {
    const { id: product_id, newQty: qty } = payload;
    ctx.dispatch(
      updateCartOneQty({
        product_id,
        qty,
      }),
    );
    if (!qty) return;
    await tryAsync(updateCartOne(product_id, { data: { product_id, qty } }));
    ctx.dispatch(fetchAsyncCartList());
  },
);

export const deleteAsyncCartOne = createAsyncThunk(
  'cart/deleteAsyncCartOne',
  async (payload, ctx) => {
    await tryAsync(deleteCartOne(payload));
    ctx.dispatch(fetchAsyncCartList());
  },
);

export const deleteAsyncCartAll = createAsyncThunk(
  'cart/deleteAsyncCartAll',
  async (_, ctx) => {
    await tryAsync(deleteAsyncCartAll());
    ctx.dispatch(fetchAsyncCartList());
  },
);

export const { setCartList, updateCartOneQty } = cartSlice.actions;

export default cartSlice.reducer;
