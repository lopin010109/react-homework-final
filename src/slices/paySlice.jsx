import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tryAsync } from '../utils/tryAsync';
import { createPayOne } from '../services/frontend/pay';
import { sendAsyncNotify } from './notifySlice';
import { setFullScreenLoading } from './loadingSlice';

export const paySlice = createSlice({
  name: 'pay',
  initialState: {
    paySuccess: false,
  },
  reducers: {
    setPayStatus(state, actions) {
      state.paySuccess = actions.payload;
    },
  },
});

export const createAsyncPayOne = createAsyncThunk(
  'pay/createAsyncPayOne',
  async (payload, ctx) => {
    ctx.dispatch(setFullScreenLoading(true));
    const res = await tryAsync(createPayOne(payload));
    if (res?.data?.success) {
      ctx.dispatch(
        sendAsyncNotify({
          type: 'success',
          title: '成功',
          text: '請求成功',
        }),
      );
      ctx.dispatch(setPayStatus(true));
    }
    ctx.dispatch(setFullScreenLoading(false));
  },
);

export const { setPayStatus } = paySlice.actions;

export default paySlice.reducer;
