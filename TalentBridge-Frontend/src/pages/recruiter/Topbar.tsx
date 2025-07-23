import { useLocation } from "react-router-dom";
import { Clock } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/features/hooks";
import UserMenu from "@/pages/commons/UserMenu.tsx";

const routeTitles: Record<
  string,
  { title: string; subtitle?: string; icon?: string }
> = {
  "/recruiter/company": {
    title: "Công ty tôi",
    subtitle: "Thông tin và cài đặt công ty",
    icon: "🏢",
  },
  "/recruiter/members": {
    title: "Đội ngũ tuyển dụng",
    subtitle: "Thông tin nhà tuyển dụng thuộc công ty bạn",
    icon: "👤",
  },
  "/recruiter/jobs": {
    title: "Việc làm",
    subtitle: "Quản lý tin tuyển dụng",
    icon: "💼",
  },
  "/recruiter/jobs/create": {
    title: "Tạo việc làm mới",
    subtitle: "Đăng tin tuyển dụng",
    icon: "➕",
  },
  "/recruiter/jobs/edit": {
    title: "Chỉnh sửa việc làm",
    subtitle: "Cập nhật tin tuyển dụng",
    icon: "✏️",
  },
  "/recruiter/skills": {
    title: "Kỹ năng",
    subtitle: "Quản lý kỹ năng yêu cầu",
    icon: "🛠️",
  },
  "/recruiter/resumes": {
    title: "Hồ sơ ứng tuyển",
    subtitle: "Danh sách CV ứng viên",
    icon: "📄",
  },
  "/recruiter/resumes/detail": {
    title: "Chi tiết hồ sơ",
    subtitle: "Thông tin ứng viên",
    icon: "👤",
  },
};

export function RecruiterTopBar() {
  const { isLogin } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const currentRoute = routeTitles[location.pathname] || {
    title: "Recruiter",
    subtitle: "Hệ thống tuyển dụng",
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-6 shadow-sm backdrop-blur-md">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <SidebarTrigger
          className={`transition-colors hover:bg-purple-50 hover:text-purple-600 lg:hidden`}
        />
        <div className="flex items-center gap-3">
          {currentRoute.icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <span className="text-lg">{currentRoute.icon}</span>
            </div>
          )}
          <div>
            <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-xl font-bold text-gray-900">
              {currentRoute.title}
            </h1>
            {currentRoute.subtitle && (
              <p className="text-sm font-medium text-gray-500">
                {currentRoute.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Center */}
      <div className="flex w-1/3 justify-center">
        <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {new Date().toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Right side */}
      {isLogin && (
        <div className="flex items-center gap-3">
          <UserMenu blackTheme />
        </div>
      )}
    </header>
  );
}
