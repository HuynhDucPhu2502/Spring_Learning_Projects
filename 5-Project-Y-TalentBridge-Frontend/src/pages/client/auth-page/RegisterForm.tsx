import { useState } from "react";
import { Link } from "react-router-dom";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  age?: number;
  address?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    age: undefined,
    address: "",
    gender: "OTHER",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? (value ? Number(value) : undefined) : value,
    }));
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Vui lòng điền các trường bắt buộc.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Email không hợp lệ.");
      return;
    }

    // TODO: Gửi request đăng ký ở đây
    console.log("Đăng ký với:", form);
    setError("");
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row w-11/12 max-w-6xl mx-auto my-20 shadow-2xl bg-orange-400 rounded-xl overflow-hidden">
      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Đăng ký</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">
                Họ tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Tên của bạn"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="********"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Tuổi</label>
              <input
                type="number"
                name="age"
                value={form.age ?? ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="18"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Số nhà, đường, TP"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Giới tính</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>

            {error && (
              <div className="text-red-600 text-sm font-semibold">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Đăng ký
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
      <div className="w-full lg:w-1/2 h-64 lg:h-auto">
        <img
          src="register-illustration.png"
          alt="Register illustration"
          className="object-top object-cover lg:object-top lg:object-fill w-full h-full"
        />
      </div>
    </div>
  );
}
