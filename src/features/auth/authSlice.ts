import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./authTypes";

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
};

// slice functions
const setCredentialsFunc = (
  state: AuthState,
  action: PayloadAction<{ token: string; user: User }>,
) => {
  state.token = action.payload.token;
  state.user = action.payload.user;
  localStorage.setItem("token", action.payload.token);
  localStorage.setItem("user", JSON.stringify(action.payload.user));
};

const loginFunc = (
  state: AuthState,
  action: PayloadAction<{ user: User; token: string }>,
) => {
  console.log("dispatch function called.");
  state.user = action.payload.user;
  state.token = action.payload.token;
  localStorage.setItem("token", JSON.stringify(action.payload.token));
  localStorage.setItem("user", JSON.stringify(action.payload.user));
};

const logoutFunc = (state: AuthState) => {
  state.token = null;
  state.user = null;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: setCredentialsFunc, // login
    login: loginFunc,
    logout: logoutFunc,
  },
});

export const { setCredentials, logout, login } = authSlice.actions;
export default authSlice.reducer;
