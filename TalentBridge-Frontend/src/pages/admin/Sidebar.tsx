import { useCallback, useEffect, useState } from "react";
import {
  Building2,
  LayoutDashboard,
  FileText,
  Wrench,
  MonitorIcon as MonitorCog,
  User,
  ChevronRight,
  Briefcase,
  Settings,
  type LucideIcon,
  ShieldCheck,
  KeyRound,
  UserCog,
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
import { useAppSelector } from "@/features/hooks.ts";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  permission?: string;
  children?: {
    title: string;
    url: string;
    icon?: LucideIcon;
    permission?: string;
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
    url: "/admin/user-manager",
    icon: User,
    permission: "GET /users",
  },
  {
    title: "Phân quyền",
    icon: ShieldCheck,
    children: [
      {
        title: "Quyền hạn",
        url: "/admin/access-control/permission",
        icon: KeyRound,
      },
      {
        title: "Chức vụ",
        url: "/admin/access-control/role",
        icon: UserCog,
      },
    ],
  },
];

export function AdminSidebar() {
  const { pathname } = useLocation();
  const permissions =
    useAppSelector((state) => state.auth.user?.permissions) ?? [];

  // ======================================================================================================
  // Quản lý trạng thái mở rộng (expand/collapse) của các menu cha trong sidebar
  // ======================================================================================================
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  /**
   * Thay đổi trạng thái mở rộng của một menu cha (expand/collapse).
   *
   * Ví dụ trạng thái expandedItems:
   *   + Xổ xuống menu cha "Tuyển dụng":      toggleExpanded("Tuyển dụng")  => ["Tuyển dụng"]
   *   + Xổ xuống menu cha "Phân quyền":     toggleExpanded("Phân quyền")  => ["Tuyển dụng", "Phân quyền"]
   *   + Đóng lại menu cha "Tuyển dụng":     toggleExpanded("Tuyển dụng")  => ["Phân quyền"]
   */
  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  // ======================================================================================================
  // Hàm kiểm tra trạng thái kích hoạt (active) của menu trong sidebar
  // ======================================================================================================

  /**
   * Kiểm tra xem menu item cấp 1 (menu cha) có đang được kích hoạt không.
   * - Nếu là menu không có con: so sánh trực tiếp với pathname.
   * - Nếu là menu có con: chỉ cần một child active thì parent cũng được coi là active.
   */
  const isItemActive = (item: MenuItem): boolean => {
    if (item.url) {
      // Menu không có con
      return pathname === item.url || pathname.startsWith(item.url + "/");
    }
    if (item.children) {
      // Menu có con, kiểm tra nếu có child nào đang active
      return item.children.some(
        (child) =>
          pathname === child.url || pathname.startsWith(child.url + "/"),
      );
    }
    return false;
  };

  /**
   * Kiểm tra xem menu item cấp 2 (menu con) có đang được kích hoạt không.
   */
  const isChildActive = useCallback(
    (childUrl: string): boolean =>
      pathname === childUrl || pathname.startsWith(childUrl + "/"),
    [pathname],
  );

  // ======================================================================================================

  // Tự động mở rộng (expand) menu cha khi truy cập trực tiếp vào route của một menu con.
  // Giúp sidebar luôn hiển thị đúng trạng thái các menu cha đang mở, tương ứng với URL hiện tại.
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
      {/*HEADER*/}
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
                  const isExpanded = expandedItems.includes(item.title);
                  const hasChildren = item.children && item.children.length > 0;

                  const filteredChildren = item.children?.filter(
                    (child) =>
                      !child.permission ||
                      permissions.includes(child.permission),
                  );

                  return (
                    <SidebarMenuItem key={item.title}>
                      {/*Trường hợp có Menu cấp 1 có con*/}
                      {hasChildren && (
                        <>
                          {/* Menu cấp 1 */}
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

                          {/* Menu cấp 2 */}
                          {isExpanded && (
                            <div className="mt-1 ml-6 space-y-1 border-l border-gray-200 pl-3">
                              {filteredChildren?.map((child) => (
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
                      )}

                      {/*Trường hợp có Menu cấp 1 không có con*/}
                      {!hasChildren && (
                        <>
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
                        </>
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
