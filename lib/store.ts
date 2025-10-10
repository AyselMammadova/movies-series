import { configureStore } from '@reduxjs/toolkit'
import { sliderApi } from './api/slider'
import { authApi } from './api/auth'
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './features/auth/authSlice';
import tabSlice from './features/auth/tabSlice';
import { listApi } from './api/list';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: authSlice,
      tab: tabSlice,
      [authApi.reducerPath]: authApi.reducer,
      [sliderApi.reducerPath]: sliderApi.reducer,
      [listApi.reducerPath]: listApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, sliderApi.middleware, listApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']