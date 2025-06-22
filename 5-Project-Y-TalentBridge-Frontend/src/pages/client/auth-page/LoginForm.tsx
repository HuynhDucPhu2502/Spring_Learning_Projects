import { useAppDispatch } from "@/features/hooks";
import { login } from "@/features/slices/auth/authThunk";
import type { loginForm } from "@/types/user";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState<loginForm>({ email: "", password: "" });
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
    <div className="flex flex-col-reverse lg:flex-row w-11/12 max-w-6xl mx-auto my-20 shadow-xl rounded-xl overflow-hidden">
      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Đăng nhập</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Nhập thư điện tử bạn ở đây"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Nhập mật khẩu bạn ở đây"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm font-semibold">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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
      <div className="w-full lg:w-1/2 h-64 lg:h-auto">
        <img
          src="login-illustration.png"
          alt="Login illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
