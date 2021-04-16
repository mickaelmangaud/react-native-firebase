import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => ({ 
      ...state,
      isLoggedIn: true, 
      user: action.payload,
      error: null
    }),
    setError: (state, action) => ({
      ...state,
      isLoggedIn: false,
      user: null,
      error: action.payload
    }),
    clearUser: (state, action) => ({
      isLoggedIn: false,
      user: null,
      error: null
    })
  },
});

export default authSlice.reducer;
export const { setUser, setError, clearUser } = authSlice.actions;