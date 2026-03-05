import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const notifySlice = createSlice({
  name: 'notify',
  initialState: [],
  reducers: {
    createNotify(state, actions) {
      const { id, type, title, text } = actions.payload;
      state.push({
        id,
        type,
        title,
        text,
      });
    },
    removeNotify(state, actions) {
      const index = state.findIndex((item) => item === actions.payload);
      state.splice(index, 1);
    },
  },
});

export const sendAsyncNotify = createAsyncThunk(
  'message/sendAsyncNotify',
  async function (payload, ctx) {
    ctx.dispatch(
      createNotify({
        ...payload,
        id: ctx.requestId,
      }),
    );

    setTimeout(() => {
      ctx.dispatch(removeNotify(ctx.requestId));
    }, 3000);
  },
);

export const { createNotify, removeNotify } = notifySlice.actions;

export default notifySlice.reducer;
