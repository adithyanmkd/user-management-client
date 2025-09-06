import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  password: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
