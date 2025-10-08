import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "../features/auth/authSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"],
};

export const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// Persist only the auth reducer to keep user token across page refreshes
