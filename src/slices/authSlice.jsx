import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tryAsync } from '../utils/tryAsync';
import { fetchLogin, fetchCheckout } from '../services/admin/auth';
import { cookieUtil } from '../utils/storage';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
  },
  reducers: {
    setIsLogin(state, actions) {
      state.isLogin = actions.payload;
    },
  },
});

export const fetchAsyncLogin = createAsyncThunk(
  'auth/fetchAsyncLogin',
  async (payload, ctx) => {
    const res = await tryAsync(fetchLogin(payload));
    cookieUtil.set('hexTokenFHW', res.token, res.expired);
    ctx.dispatch(fetchAsyncCheckout());
  },
);

export const fetchAsyncCheckout = createAsyncThunk(
  'auth/fetchAsyncCheckout',
  async (_, ctx) => {
    const res = await tryAsync(fetchCheckout());
    ctx.dispatch(setIsLogin(res.success));
  },
);

export const { setIsLogin } = authSlice.actions;

export default authSlice.reducer;
