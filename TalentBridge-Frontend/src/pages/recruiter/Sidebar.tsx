import {
  Building2,
  Briefcase,
  Settings,
  FileText,
  MonitorIcon as MonitorCog,
  type LucideIcon,
  Home,
  UserRound,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/features/hooks.ts";

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  permission?: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Công ty tôi",
    url: "/recruiter/company",
    icon: Building2,
    permission: "GET /companies/me",
  },
  {
    title: "Đội ngũ tuyển dụng",
    url: "/recruiter/members",
    icon: UserRound,
    permission: "GET /companies/me/users",
  },
  {
    title: "Công việc",
    url: "/recruiter/jobs",
    icon: Briefcase,
    permission: "GET /jobs/company",
  },
  {
    title: "Kỹ năng",
    url: "/recruiter/skills",
    icon: Settings,
    permission: "GET /skills",
  },
  {
    title: "Hồ sơ ứng tuyển",
    url: "/recruiter/resumes",
    icon: FileText,
    permission: "GET /resumes/company",
  },
];

export function RecruiterSidebar() {
  const { pathname } = useLocation();
  const permissions =
    useAppSelector((state) => state.auth.user?.permissions) ?? [];

  /**
   * Kiểm tra xem menu item có đang được kích hoạt không.
   */
  const isItemActive = (item: MenuItem): boolean => {
    return pathname === item.url || pathname.startsWith(item.url + "/");
  };

  return (
    <Sidebar className="border-r border-purple-100 bg-gradient-to-b from-purple-50/30 to-white">
      {/*HEADER*/}
      <div className="flex h-16 items-center border-b border-purple-100 bg-gradient-to-r from-purple-600 to-purple-700 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-white/30 bg-white/20">
            <MonitorCog className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="text-lg font-semibold text-white">RECRUITER</span>
            <p className="text-xs text-purple-100">Bảng tuyển dụng</p>
          </div>
        </div>
      </div>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems
                .filter(
                  (item) =>
                    !item.permission || permissions.includes(item.permission),
                )
                .map((item) => {
                  const isActive = isItemActive(item);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "w-full justify-start rounded-md py-2 text-sm font-medium",
                          isActive
                            ? "bg-gradient-to-r from-purple-500 to-purple-600"
                            : "text-gray-700 hover:bg-purple-50 hover:text-purple-700",
                        )}
                      >
                        <Link
                          to={item.url}
                          className="flex w-full items-center gap-3"
                        >
                          <item.icon
                            className={`h-4 w-4 ${isActive ? "text-white" : ""}`}
                          />
                          <span
                            className={`${isActive ? "font-bold text-white" : ""}`}
                          >
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-purple-100 px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="w-full justify-start rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
            >
              <Link to="/" className="flex w-full items-center gap-3">
                <Home className="h-4 w-4" />
                <span>Quay về trang chủ</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
