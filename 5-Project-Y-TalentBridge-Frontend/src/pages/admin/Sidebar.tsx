"use client";

import {
  Building2,
  LayoutDashboard,
  FileText,
  Shield,
  Wrench,
  MonitorCog,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Tổng quan",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Công ty",
    url: "/admin/company",
    icon: Building2,
  },
  {
    title: "Tuyển dụng",
    url: "/admin/recruitment",
    icon: Wrench,
  },
  {
    title: "Hồ sơ ứng tuyển",
    url: "/admin/resume",
    icon: FileText,
  },
  {
    title: "Tài khoản",
    url: "/admin/user",
    icon: User,
  },
  {
    title: "Phân quyền",
    url: "/admin/permission",
    icon: Shield,
  },
];

export function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar className="border-r border-blue-100 bg-gradient-to-b from-blue-50/30 to-white">
      {/* Header */}
      <div className="flex h-16 items-center px-6 border-b border-blue-100 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
            <MonitorCog className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-white tracking-wide">
              QUẢN TRỊ
            </span>
            <p className="text-xs text-blue-100 font-medium">Bảng điều khiển</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <SidebarContent className=" py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname.includes(item.url) || pathname === item.url
                    }
                    className="w-full justify-start py-3 text-sm font-medium transition-all duration-200 rounded-xl hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm hover:scale-[1.02] data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-blue-600 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-blue-500/25 data-[active=true]:border-0"
                  >
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 w-full"
                    >
                      <div
                        className={`p-1.5 rounded-lg transition-colors ${
                          pathname.includes(item.url) || pathname === item.url
                            ? "bg-white/20"
                            : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                      {(pathname.includes(item.url) ||
                        pathname === item.url) && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-sm"></div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
