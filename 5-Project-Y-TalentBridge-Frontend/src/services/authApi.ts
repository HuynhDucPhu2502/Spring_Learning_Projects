import axiosClient from "@/lib/axiosClient";
import type { ApiResponse } from "@/types/apiResponse";
import type { loginForm, AuthResponse, User } from "@/types/user";
import axios from "axios";

export const loginApi = (data: loginForm) => {
  return axiosClient.post<ApiResponse<AuthResponse>>("/auth/login", data);
};

export const logoutApi = () => {
  return axios.post(
    "http://localhost:8080/auth/logout",
    {},
    { withCredentials: true }
  );
};

export const getAccountApi = () => {
  return axiosClient.get<ApiResponse<User>>("/auth/account");
};

export const refreshTokenApi = () => {
  return axios.post<ApiResponse<AuthResponse>>(
    "http://localhost:8080/auth/refresh-token",
    {},
    { withCredentials: true }
  );
};
