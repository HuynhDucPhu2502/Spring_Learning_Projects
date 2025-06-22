import { useLocation } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/features/hooks";

// Mapping routes to breadcrumb titles
const routeTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/company": "Quản lý công ty",
  "/admin/user": "Quản lý người dùng",
  "/admin/job": "Quản lý việc làm",
  "/admin/resume": "Quản lý CV",
  "/admin/permission": "Phân quyền",
  "/admin/sale": "Quản lý bán hàng",
};

export function AdminTopBar() {
  const { isLogin, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const currentTitle = routeTitles[location.pathname] || "Admin";

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden" />
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {currentTitle}
          </h1>
          <p className="text-sm text-gray-500">Quản trị hệ thống</p>
        </div>
      </div>

      {/* Right side */}
      {isLogin && (
        <div className="flex items-center gap-2">
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Hồ sơ cá nhân</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}
