import { loginApi, logoutApi } from "@/services/authApi";
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
  reducers: {},
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

const handleError = (err: unknown, message: string): string => {
  let res = message;
  if (axios.isAxiosError(err)) {
    res = err.response?.data.message;
  }
  return res;
};

// ===========================================
// EXPORT REDUCER
// ===========================================
export default authSlice.reducer;
