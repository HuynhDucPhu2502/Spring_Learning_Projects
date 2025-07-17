import axiosClient from "@/lib/axiosClient";
import type { ApiResponse } from "@/types/apiResponse.types.ts";
import type { loginRequestDto, AuthTokenResponseDto, UserSessionResponseDto } from "@/types/user.types.ts";
import axios from "axios";

export const loginApi = (data: loginRequestDto) => {
  return axiosClient.post<ApiResponse<AuthTokenResponseDto>>("/auth/login", data);
};

export const logoutApi = () => {
  return axios.post(
    "http://localhost:8080/auth/logout",
    {},
    { withCredentials: true },
  );
};

export const getAccountApi = () => {
  return axiosClient.get<ApiResponse<UserSessionResponseDto>>("/auth/me");
};

export const refreshTokenApi = () => {
  return axios.post<ApiResponse<AuthTokenResponseDto>>(
    "/auth/refresh-token",
    {},
    { withCredentials: true },
  );
};
