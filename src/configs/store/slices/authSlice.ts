import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios";

// types
export type FormDataType = {
  name?: string;
  password: string;
  email: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData: FormDataType, thunkApi) => {
    try {
      const response = await api.post("/users", formData);
      console.log(response.data);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //   console.log(error.response?.data);
      const message = error.response?.data?.message || "Registration failed!";
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData: FormDataType, thunkApi) => {
    try {
      const response = await api.post("/auth/login", formData);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      return thunkApi.rejectWithValue(message);
    }
  },
);

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log("login payload log: ", action.payload);
        // action payload gives server response
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
