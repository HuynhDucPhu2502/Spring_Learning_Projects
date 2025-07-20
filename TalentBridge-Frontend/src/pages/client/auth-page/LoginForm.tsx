import { useAppDispatch } from "@/features/hooks";
import { login } from "@/features/slices/auth/authThunk";
import type { UserLoginRequestDto } from "@/types/user.types.ts";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState<UserLoginRequestDto>({
    email: "",
    password: "",
    sessionMetaRequest: null,
  });
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Email không hợp lệ.");
      return;
    }

    dispatch(login(form));
  };

  return (
    <div className="mx-auto my-20 flex w-11/12 max-w-6xl flex-col-reverse overflow-hidden rounded-xl shadow-xl lg:flex-row">
      {/* Form */}
      <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-center text-3xl font-bold">Đăng nhập</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
                placeholder="Nhập thư điện tử bạn ở đây"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2"
                placeholder="Nhập mật khẩu bạn ở đây"
              />
            </div>

            {error && (
              <div className="text-sm font-semibold text-red-600">{error}</div>
            )}

            <button
              type="submit"
              className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            Chưa có tài khoản?{" "}
            <Link
              to="/auth?mode=register"
              className="text-blue-600 hover:underline"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div className="h-64 w-full lg:h-auto lg:w-1/2">
        <img
          src="login-illustration.png"
          alt="Login illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
