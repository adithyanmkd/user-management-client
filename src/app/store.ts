import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import { persistedAuthReducer } from "./persistConfig";
import adminUsersReducer from "../features/dashboard/adminUsersSlice";

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    users: adminUsersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // for redux-persist
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
