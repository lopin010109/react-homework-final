import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isFullScreenLoading: false,
  },
  reducers: {
    setFullScreenLoading(state, actions) {
      state.isFullScreenLoading = actions.payload;
    },
  },
});

export const { setFullScreenLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
