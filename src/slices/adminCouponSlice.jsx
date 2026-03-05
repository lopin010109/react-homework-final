import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tryAsync } from '../utils/tryAsync';
import {
  createAdminCouponOne,
  deleteAdminCouponOne,
  fetchAdminCouponList,
  updateAdminCouponOne,
} from '../services/admin/coupon';

export const adminCouponSlice = createSlice({
  name: 'adminCoupon',
  initialState: {
    initAdminCoupon: {
      title: '',
      is_enabled: 0,
      percent: 0,
      due_date: 0,
      code: '',
    },
    adminCouponList: [],
    adminCouponPagination: {
      total_pages: 1,
      current_page: 1,
      has_pre: false,
      has_next: false,
      category: '',
    },
    paginationPosition: 'end',
  },
  reducers: {
    setAdminCouponList(state, actions) {
      state.adminCouponList = actions.payload;
    },
    setAdminCouponPagination(state, actions) {
      state.adminCouponPagination = actions.payload;
    },
  },
});

export const fetchAsyncAdminCouponList = createAsyncThunk(
  'adminCoupon/fetchAsyncAdminCouponList',
  async (payload, ctx) => {
    let query = `page=${payload?.page}`;

    const res = await tryAsync(fetchAdminCouponList(query));
    ctx.dispatch(setAdminCouponList(res?.data?.coupons));
    ctx.dispatch(setAdminCouponPagination(res?.data?.pagination));
  },
);

export const createAsyncAdminCouponOne = createAsyncThunk(
  'adminCoupon/createAsyncAdminCouponOne',
  async (payload, ctx) => {
    await tryAsync(createAdminCouponOne(payload));
    ctx.dispatch(
      fetchAsyncAdminCouponList({
        page: 1,
      }),
    );
  },
);

export const updateAsyncAdminCouponOne = createAsyncThunk(
  'adminCoupon/updateAsyncAdminCouponOne',
  async (payload, ctx) => {
    await tryAsync(updateAdminCouponOne(payload.id, { data: payload.data }));
    ctx.dispatch(
      fetchAsyncAdminCouponList({
        page: 1,
      }),
    );
  },
);

export const deleteAsyncAdminCouponOne = createAsyncThunk(
  'adminCoupon/deleteAsyncAdminCouponOne',
  async (payload, ctx) => {
    await tryAsync(deleteAdminCouponOne(payload));
    ctx.dispatch(
      fetchAsyncAdminCouponList({
        page: 1,
      }),
    );
  },
);

export const { setAdminCouponList, setAdminCouponPagination } =
  adminCouponSlice.actions;

export default adminCouponSlice.reducer;
