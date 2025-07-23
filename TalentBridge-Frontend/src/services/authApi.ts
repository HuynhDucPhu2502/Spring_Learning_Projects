import axiosClient from "@/lib/axiosClient";
import type { ApiResponse } from "@/types/apiResponse.d.ts";
import type {
  UserLoginRequestDto,
  AuthTokenResponseDto,
  UserSessionResponseDto,
  UserDetailsResponseDto,
  SessionMetaRequest,
  SessionMetaResponse,
  UserRegisterRequestDto,
} from "@/types/user.d.ts";
import { getSessionMeta } from "@/utils/sessionHelper";
import axios from "axios";

export const registerApi = (data: UserRegisterRequestDto) => {
  return axios.post("http://localhost:8080/auth/register", data, {
    withCredentials: true,
  });
};

export const loginApi = (data: UserLoginRequestDto) => {
  data = {
    ...data,
    sessionMetaRequest: getSessionMeta(),
  };

  return axiosClient.post<ApiResponse<AuthTokenResponseDto>>(
    "/auth/login",
    data,
  );
};

export const logoutApi = () => {
  return axios.post(
    "http://localhost:8080/auth/logout",
    {},
    { withCredentials: true },
  );
};

export const getUserSession = () => {
  return axiosClient.get<ApiResponse<UserSessionResponseDto>>("/auth/me");
};

export const getUserDetails = () => {
  return axiosClient.get<ApiResponse<UserDetailsResponseDto>>(
    "/auth/me/details",
  );
};

export const refreshTokenApi = () => {
  const data: SessionMetaRequest = getSessionMeta();

  return axios.post<ApiResponse<AuthTokenResponseDto>>(
    "http://localhost:8080/auth/refresh-token",
    data,
    { withCredentials: true },
  );
};

export const getSessions = () => {
  return axiosClient.get<ApiResponse<SessionMetaResponse[]>>(`/auth/sessions`);
};

export const removeSessionId = (sessionId: string) => {
  return axiosClient.delete(`/auth/sessions/${sessionId}`);
};
