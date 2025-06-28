import { User, Settings, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { logout } from "@/features/slices/auth/authThunk";

const UserMenu = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 px-3 py-2 h-auto hover:bg-blue-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all">
              <AvatarImage
                src={"/placeholder.svg"}
                alt={user?.name || "User"}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-lg font-semibold text-gray-900">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-gray-500">{user?.email || "Email"}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        {/* User Info Header */}
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg mb-2">
          <Avatar className="h-12 w-12 ring-2 ring-white">
            <AvatarImage src={"/placeholder.svg"} alt={user?.name || "User"} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">
              {user?.name || "User"}
            </p>
            <p className="text-sm text-gray-600">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">Hồ sơ cá nhân</p>
            <p className="text-xs text-gray-500">Xem và chỉnh sửa thông tin</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
            <Settings className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <p className="font-medium">Cài đặt</p>
            <p className="text-xs text-gray-500">Tùy chỉnh hệ thống</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 cursor-pointer text-red-600 hover:text-red-700"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
            <LogOut className="h-4 w-4 text-red-600" />
          </div>
          <div>
            <p className="font-medium">Đăng xuất</p>
            <p className="text-xs text-red-500">Thoát khỏi hệ thống</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
