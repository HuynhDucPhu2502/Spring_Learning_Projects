"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
export default function JobSkillPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = location.pathname.includes("job-manager")
    ? "job-manager"
    : "skill-manager";

  return (
    <div className="space-y-6">
      <Tabs value={currentTab} onValueChange={(val) => navigate(`${val}`)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="skill-manager">🛠️ Manage Skills</TabsTrigger>
          <TabsTrigger value="job-manager">💼 Manage Jobs</TabsTrigger>
        </TabsList>
      </Tabs>

      <Outlet />
    </div>
  );
}
