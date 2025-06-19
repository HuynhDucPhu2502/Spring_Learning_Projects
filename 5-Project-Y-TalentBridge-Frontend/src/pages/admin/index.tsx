import { AdminSidebar } from "@/components/custom/admin/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { getAccount } from "@/features/slices/authSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLogin) dispatch(getAccount());
  }, [isLogin, dispatch]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
