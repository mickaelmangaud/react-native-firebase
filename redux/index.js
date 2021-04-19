import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import uiReducer from './ui/slice';
import postReducer from './posts/slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    post: postReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
}),});

export default store;