import { SidebarProvider } from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getAccount } from "@/features/slices/auth/authThunk";
import { AdminTopBar } from "./Topbar";
import { AdminSidebar } from "./Sidebar";

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
        <div className="flex-1 flex flex-col">
          <AdminTopBar />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
