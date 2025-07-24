import { User, BarChart3, Settings, Mail } from "lucide-react";
import { useAppSelector } from "@/features/hooks";
import { Navigate, NavLink, Outlet } from "react-router-dom";

const navigationItems = [
  { title: "Thông tin", icon: User, href: "info" },
  { title: "Đăng ký thông báo", icon: Mail, href: "subscriber" },
  { title: "Hồ sơ tuyển dụng", icon: BarChart3, href: "resumes" },
  { title: "Bảo mật", icon: Settings, href: "sessions" },
];

export default function UserPage() {
  const { isLogin, user } = useAppSelector((state) => state.auth);

  if (!isLogin || !user) return <Navigate to="/auth?mode=login" replace />;

  return (
    <>
      <div className="flex min-h-screen bg-gray-100 p-4">
        {/* Sidebar */}
        <div
          className={`hidden w-64 transform rounded-lg bg-white shadow-lg lg:block`}
          style={{ height: "fit-content", maxHeight: "80vh" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h1 className="text-xl font-semibold text-gray-800">
              Xin chào <span className="text-yellow-500">{user.name}</span>!
            </h1>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems
                .filter((item) => {
                  if (item.title === "Hồ sơ tuyển dụng")
                    return user.permissions?.includes("POST /resumes");

                  if (item.title === "Đăng ký thông báo")
                    return user.permissions?.includes("GET /subscribers/me");

                  return true;
                })
                .map((item) => (
                  <li key={item.title}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        } `
                      }
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.title}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
