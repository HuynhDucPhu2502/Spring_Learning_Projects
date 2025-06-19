import {
  getAccountApi,
  loginApi,
  logoutApi,
  refreshTokenApi,
} from "@/services/authApi";
import type { loginForm, User } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===========================================
// Slice
// ===========================================
type AuthState = {
  user: User;
  isLogin: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialValue: AuthState = {
  user: { id: "", name: "", email: "" },
  isLogin: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    updateTokenManually(state, action) {
      state.user = action.payload.user;
      localStorage.setItem("access_token", action.payload.accessToken);
      state.isLogin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("access_token", action.payload.accessToken);

        state.isLogin = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { id: "", name: "", email: "" };
        state.isLogin = false;
        state.isLoading = false;
        localStorage.removeItem("access_token");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // GET ACCOUNT
      .addCase(getAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.user = action.payload;

        state.isLogin = true;
        state.isLoading = false;
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // REFRESH TOKEN
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("access_token", action.payload.accessToken);

        state.isLogin = true;
        state.isLoading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;

        localStorage.removeItem("access_token");
        state.isLogin = false;
      });
  },
});

// ===========================================
// ASYNC THUNK
// ===========================================
export const login = createAsyncThunk(
  "auth/login",
  async (data: loginForm, thunkAPI) => {
    try {
      const res = await loginApi(data);
      return res.data.data;
    } catch (err: unknown) {
      const message = handleError(err, "Đăng nhập thất bại");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutApi();
  } catch (err: unknown) {
    const message = handleError(err, "Đăng xuất thất bại");
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAccount = createAsyncThunk(
  "auth/account",
  async (_, thunkAPI) => {
    try {
      const res = await getAccountApi();
      return res.data.data;
    } catch (err: unknown) {
      const message = handleError(err, "Lấy thông tin tài khoản thất bại");
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
      const message = handleError(err, "Làm mới phiên đăng nhập thất bại");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const handleError = (err: unknown, message: string): string => {
  let res = message;
  if (axios.isAxiosError(err)) res = err.response?.data.message || message;
  return res;
};

// ===========================================
// EXPORT REDUCER
// ===========================================
export const { updateTokenManually } = authSlice.actions;
export default authSlice.reducer;
