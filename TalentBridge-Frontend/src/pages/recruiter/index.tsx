import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { RecruiterSidebar } from "./Sidebar";
import { RecruiterTopBar } from "./Topbar";

const RecruiterPage = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <RecruiterSidebar />
        <div className="flex flex-1 flex-col">
          <RecruiterTopBar />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RecruiterPage;
