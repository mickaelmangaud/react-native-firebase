import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoader: (state, action) => ({ ...state, loading: true }),
    hideLoader: (state, action) => ({ ...state, loading: false }),
  },
});

export default uiSlice.reducer;
export const { setLoader, hideLoader } = uiSlice.actions;