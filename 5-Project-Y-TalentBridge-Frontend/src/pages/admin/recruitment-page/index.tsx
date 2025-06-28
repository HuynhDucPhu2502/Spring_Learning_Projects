import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Wrench } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function RecruitmentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  let currentTab = "job-manager";
  if (location.pathname.includes("/skill-manager"))
    currentTab = "skill-manager";

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex justify-center">
        <Tabs
          value={currentTab}
          onValueChange={(val) => navigate(`${val}`)}
          className="w-full max-w-2xl"
        >
          <TabsList className="grid h-16 w-full grid-cols-2 gap-2 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-3 shadow-lg">
            <TabsTrigger
              value="job-manager"
              className="group relative h-12 rounded-xl px-6 text-base font-bold transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-1.5 text-blue-600 transition-all duration-300 group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span>Công việc</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="skill-manager"
              className="group relative h-12 rounded-xl px-6 text-base font-bold transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-1.5 text-blue-600 transition-all duration-300 group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white">
                  <Wrench className="h-5 w-5" />
                </div>
                <span>Kỹ năng</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        <Outlet />
      </div>
    </div>
  );
}
