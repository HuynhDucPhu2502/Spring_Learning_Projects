import type { ApiResponse } from "@/types/apiResponse";
import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";

// ============================================================
// Cấu hình mặc định cho các request
// ============================================================
const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// Interceptor: Tự động gắn Access Token vào mỗi request
// ============================================================
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ============================================================
// Cơ chế hàng đợi xử lý request bị lỗi 401 trong khi refresh token:
// - failedQueue lưu các request bị 401
// - Khi refresh thành công → resolve queue
// - Khi refresh fail → reject toàn bộ queue
// ============================================================
type FailedRequest = {
  resolve: () => void;
  reject: (reason?: unknown) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) resolve();
    else reject(error);
  });
  failedQueue = [];
};

// ============================================================
// Interceptor: Xử lý lỗi 401 và errorCode UNAUTHORIZED
// ============================================================
let isRefreshing = false;

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check lỗi có phải thuộc lại lỗi JWT Token
    const isUnauthorized =
      error.response?.status === 401 &&
      (error.response?.data as ApiResponse<null>)?.errorCode === "UNAUTHORIZED";

    if (isUnauthorized && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(originalRequest)) // trigger khi resolve()
          .catch((err) => Promise.reject(err)); // trigger khi reject()
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          "http://localhost:8080/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("access_token", newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
