import axiosClient from "@/lib/axiosClient";
import type { ApiResponse } from "@/types/apiResponse";
import type { loginForm, AuthResponse } from "@/types/user";

export const loginApi = (data: loginForm) => {
  return axiosClient.post<ApiResponse<AuthResponse>>("/auth/login", data);
};

export const logoutApi = () => {
  return axiosClient.post("/auth/logout");
};
