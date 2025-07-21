import { getErrorMessage } from "@/features/slices/auth/authThunk";
import { registerApi } from "@/services/authApi";
import type { UserRegisterRequestDto } from "@/types/user";
import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RegisterForm() {
  const [form, setForm] = useState<UserRegisterRequestDto>({
    name: "",
    email: "",
    password: "",
    dob: "",
    address: "",
    gender: "OTHER",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validateDateOfBirth = (dob: string): boolean => {
    if (!dob) return true; // Optional field

    const birthDate = new Date(dob);
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 120,
      today.getMonth(),
      today.getDate(),
    );

    return birthDate <= today && birthDate >= minDate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!form.name || !form.email || !form.password) {
        setError("Vui lòng điền các trường bắt buộc.");
        return;
      }

      if (!validateEmail(form.email)) {
        setError("Email không hợp lệ.");
        return;
      }

      if (form.dob && !validateDateOfBirth(form.dob)) {
        setError("Ngày sinh không hợp lệ.");
        return;
      }

      await registerApi(form);
      toast.info("Đăng ký thành công, vui lòng đăng nhập lại");
      navigate("/auth?mode=login");
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác thất bại"));
    } finally {
      setIsLoading(false);
      setError("");
    }


  };

  return (
    <div className="mx-auto my-20 flex w-11/12 max-w-6xl flex-col-reverse overflow-hidden rounded-xl bg-orange-400 shadow-2xl lg:flex-row">
      {/* Form */}
      <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-center text-3xl font-bold">Đăng ký</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">
                Họ tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
                placeholder="Tên của bạn"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
                placeholder="********"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Ngày sinh</label>
              <input
                type="date"
                name="dob"
                value={form.dob ?? ""}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
                max={new Date().toISOString().split("T")[0]} // Prevent future dates
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
                placeholder="Số nhà, đường, TP"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Giới tính</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>

            {error && (
              <div className="text-sm font-semibold text-red-600">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            >
              {isLoading ? "Đang đăng ký..." : "Đăng ký ngay"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            Đã có tài khoản?{" "}
            <Link
              to="/auth?mode=login"
              className="text-blue-600 hover:underline"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div className="h-64 w-full lg:h-auto lg:w-1/2">
        <img
          src="register-illustration.png"
          alt="Register illustration"
          className="h-full w-full object-cover object-top lg:object-fill lg:object-top"
        />
      </div>
    </div>
  );
}
