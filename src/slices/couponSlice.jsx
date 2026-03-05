import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tryAsync } from '../utils/tryAsync';
import { fetchExchangeCoupon } from '../services/frontend/coupon';
import { fetchAsyncCartList } from './cartSlice';

export const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    coupon_final_total: 0,
  },
  reducers: {},
});

export const fetchAsyncExchangeCoupon = createAsyncThunk(
  'coupon/fetchAsyncExchangeCoupon',
  async (payload, ctx) => {
    await tryAsync(fetchExchangeCoupon({ data: { code: payload } }));
    ctx.dispatch(fetchAsyncCartList());
  },
);

export default couponSlice.reducer;
