import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tryAsync } from '../utils/tryAsync';
import {
  deleteAdminOrderAll,
  deleteAdminOrderOne,
  fetchAdminOrderList,
  updateAdminOrderOne,
} from '../services/admin/order';

export const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState: {
    adminOrderList: [],
    adminOrderPagination: {
      total_pages: 1,
      current_page: 1,
      has_pre: false,
      has_next: false,
      category: '',
    },
    paginationPosition: 'end',
  },
  reducers: {
    setAdminOrderList(state, actions) {
      state.adminOrderList = actions.payload;
    },
    setAdminOrderPagination(state, actions) {
      state.adminOrderPagination = actions.payload;
    },
  },
});

export const fetchAsyncAdminOrderList = createAsyncThunk(
  'adminOrder/fetchAdminOrderList',
  async (payload, ctx) => {
    let query = `page=${payload?.page}`;

    const res = await tryAsync(fetchAdminOrderList(query));
    ctx.dispatch(setAdminOrderList(res?.data?.orders));
    ctx.dispatch(setAdminOrderPagination(res?.data?.pagination));
  },
);

export const updateAsyncAdminOrderOne = createAsyncThunk(
  'adminOrder/updateAsyncAdminOrderOne',
  async (payload, ctx) => {
    await tryAsync(updateAdminOrderOne(payload.id, { data: payload.data }));
    ctx.dispatch(
      fetchAsyncAdminOrderList({
        page: 1,
      }),
    );
  },
);

export const deleteAsyncAdminOrderOne = createAsyncThunk(
  'adminOrder/deleteAsyncAdminOrderOne',
  async (payload, ctx) => {
    await tryAsync(deleteAdminOrderOne(payload));
    ctx.dispatch(
      fetchAsyncAdminOrderList({
        page: 1,
      }),
    );
  },
);

export const deleteAsyncAdminOrderAll = createAsyncThunk(
  'adminOrder/deleteAsyncAdminOrderAll',
  async (payload, ctx) => {
    await tryAsync(deleteAdminOrderAll());
    ctx.dispatch(
      fetchAsyncAdminOrderList({
        page: 1,
      }),
    );
  },
);

export const { setAdminOrderList, setAdminOrderPagination } =
  adminOrderSlice.actions;

export default adminOrderSlice.reducer;
