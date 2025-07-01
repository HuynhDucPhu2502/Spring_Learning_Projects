import { useCallback, useEffect, useState } from "react";
import {
  Building2,
  LayoutDashboard,
  FileText,
  Shield,
  Wrench,
  MonitorIcon as MonitorCog,
  User,
  ChevronRight,
  Briefcase,
  Settings,
  type LucideIcon,
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
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  children?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

const menuItems: MenuItem[] = [
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
    icon: Wrench,
    children: [
      {
        title: "Quản lý việc làm",
        url: "/admin/recruitment/job-manager",
        icon: Briefcase,
      },
      {
        title: "Quản lý kỹ năng",
        url: "/admin/recruitment/skill-manager",
        icon: Settings,
      },
    ],
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
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  const isItemActive = (item: MenuItem): boolean => {
    if (item.url) {
      return pathname === item.url || pathname.startsWith(item.url + "/");
    }
    if (item.children) {
      return item.children.some(
        (child) =>
          pathname === child.url || pathname.startsWith(child.url + "/"),
      );
    }
    return false;
  };

  const isChildActive = useCallback(
    (childUrl: string): boolean => {
      return pathname === childUrl || pathname.startsWith(childUrl + "/");
    },
    [pathname],
  );

  useEffect(() => {
    menuItems.forEach((item) => {
      if (
        item.children &&
        item.children.some((child) => isChildActive(child.url))
      ) {
        setExpandedItems((prev) =>
          prev.includes(item.title) ? prev : [...prev, item.title],
        );
      }
    });
  }, [pathname, isChildActive]);

  return (
    <Sidebar className="border-r border-blue-100 bg-gradient-to-b from-blue-50/30 to-white">
      {/* Simple Header */}
      <div className="flex h-16 items-center border-b border-blue-100 bg-gradient-to-r from-blue-600 to-blue-700 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-white/30 bg-white/20">
            <MonitorCog className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="text-lg font-semibold text-white">QUẢN TRỊ</span>
            <p className="text-xs text-blue-100">Bảng điều khiển</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = isItemActive(item);
                const isExpanded = expandedItems.includes(item.title);
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <SidebarMenuItem key={item.title}>
                    {hasChildren ? (
                      <>
                        {/* Parent Item */}
                        <div
                          onClick={() => toggleExpanded(item.title)}
                          className={cn(
                            "flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
                            isActive
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-700",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4",
                              isExpanded ? "rotate-90" : "rotate-0",
                            )}
                          />
                        </div>

                        {/* Children Items */}
                        {isExpanded && (
                          <div className="mt-1 ml-6 space-y-1 border-l border-gray-200 pl-3">
                            {item.children?.map((child) => (
                              <SidebarMenuButton
                                asChild
                                key={child.title}
                                isActive={isChildActive(child.url)}
                                className={cn(
                                  "w-full justify-start rounded-md py-2 text-sm",
                                  isChildActive(child.url)
                                    ? "bg-blue-100 text-blue-800"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700",
                                )}
                              >
                                <Link
                                  to={child.url}
                                  className="flex w-full items-center gap-3"
                                >
                                  {child.icon ? (
                                    <child.icon className="h-4 w-4" />
                                  ) : (
                                    <div className="h-1.5 w-1.5 rounded-full bg-current"></div>
                                  )}
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "w-full justify-start rounded-md py-2 text-sm font-medium",
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-blue-600"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700",
                        )}
                      >
                        <Link
                          to={item.url!}
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
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
