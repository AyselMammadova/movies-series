import { configureStore } from '@reduxjs/toolkit'
import { myApi } from './api/slider'

export const makeStore = () => {
  return configureStore({
    reducer: {
        [myApi.reducerPath]: myApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']