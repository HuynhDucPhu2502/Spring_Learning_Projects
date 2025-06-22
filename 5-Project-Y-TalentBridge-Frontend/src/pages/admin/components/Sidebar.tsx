import {
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  FileText,
  Shield,
  ShoppingCart,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

// Dữ liệu menu admin
const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Company",
    url: "/admin/company",
    icon: Building2,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: Users,
  },
  {
    title: "Job",
    url: "/admin/job",
    icon: Briefcase,
  },
  {
    title: "Resume",
    url: "/admin/resume",
    icon: FileText,
  },
  {
    title: "Permission",
    url: "/admin/permission",
    icon: Shield,
  },
  {
    title: "Sale",
    url: "/admin/sale",
    icon: ShoppingCart,
  },
];

export const AdminSidebar = () => {
  const location = useLocation();

  const activeItem = adminMenuItems.find(
    (item) => item.url === location.pathname
  )?.title;

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Settings className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold text-foreground">ADMIN</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.title === activeItem}
                    className="w-full justify-start px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-r-2 data-[active=true]:border-blue-700"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};
