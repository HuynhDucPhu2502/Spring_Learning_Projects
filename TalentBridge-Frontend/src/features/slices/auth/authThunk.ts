import {
  getUserSession,
  loginApi,
  logoutApi,
  refreshTokenApi,
} from "@/services/authApi";
import type { loginRequestDto } from "@/types/user.types.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ===========================================
// ASYNC THUNK
// ===========================================
export const login = createAsyncThunk(
  "auth/login",
  async (data: loginRequestDto, thunkAPI) => {
    try {
      const res = await loginApi(data);
      return res.data.data;
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Đăng nhập thất bại");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutApi();
  } catch (err: unknown) {
    const message = getErrorMessage(err, "Đăng xuất thất bại");
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAccount = createAsyncThunk(
  "auth/account",
  async (_, thunkAPI) => {
    try {
      const res = await getUserSession();
      return res.data.data;
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Lấy thông tin tài khoản thất bại");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (_, thunkAPI) => {
    try {
      const res = await refreshTokenApi();
      return res.data.data;
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Làm mới phiên đăng nhập thất bại");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getErrorMessage = (err: unknown, message: string): string => {
  let res = message;
  if (axios.isAxiosError(err)) res = err.response?.data.message || message;
  return res;
};
