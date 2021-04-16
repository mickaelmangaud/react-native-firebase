import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import uiReducer from './ui/slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  }
});

export default store;