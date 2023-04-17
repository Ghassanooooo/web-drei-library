import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./features/dashboardSlice";
import { dashboardApi } from "./api/dashboardApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    dashboardReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([dashboardApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
