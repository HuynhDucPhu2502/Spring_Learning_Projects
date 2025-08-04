import type React from "react";

import { useAppDispatch } from "@/features/hooks";
import { getErrorMessage, login } from "@/features/slices/auth/authThunk";
import type { UserLoginRequestDto } from "@/types/user.d.ts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function LoginPage() {
  const [form, setForm] = useState<UserLoginRequestDto>({
    email: "",
    password: "",
    sessionMetaRequest: null,
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Email không hợp lệ.");
      return;
    }

    try {
      setIsLoading(true);
      await dispatch(login(form)).unwrap();
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="flex-1 p-8 lg:p-12">
            <div className="mx-auto max-w-md">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Đăng nhập
                </h1>
                <p className="text-gray-600">Chào mừng bạn quay trở lại!</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all duration-200 outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
                    placeholder="example@email.com"
                    disabled={isLoading}
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mật khẩu <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all duration-200 outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
                    placeholder="Nhập mật khẩu của bạn"
                    disabled={isLoading}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-orange-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Đang đăng nhập...
                    </div>
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
              </form>

              {/* Register Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Chưa có tài khoản?{" "}
                  <Link
                    to="/auth?mode=register"
                    className="font-semibold text-orange-500 transition-colors duration-200 hover:text-orange-600 hover:underline"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="mt-8 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500">Hoặc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-orange-400 to-orange-500 p-8 lg:p-12">
            <div className="text-center text-white">
              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="h-16 w-16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="mb-4 text-2xl font-bold">Chào mừng trở lại!</h2>
              <p className="text-lg leading-relaxed text-orange-100">
                Đăng nhập để tiếp tục hành trình nghề nghiệp của bạn
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
