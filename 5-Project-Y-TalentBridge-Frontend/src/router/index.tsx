import AuthPage from "@/pages/client/auth-page";
import HomePage from "@/pages/client/home-page";
import ProtectedRoute from "@/pages/client/ProtectedRoute ";
import RootPage from "@/pages/client";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminPage from "@/pages/admin";
import CompanyPage from "@/pages/admin/company-page";
import DashboardPage from "@/pages/admin/dashboard-page";
import { SkillManagerPage } from "@/pages/admin/recruitment-page/skill-manager-page";
import { JobManagerPanel } from "@/pages/admin/recruitment-page/job-manager-page";
import JobUpsertPage from "@/pages/admin/recruitment-page/job-manager-page/job-upsert-page";
import RecruitmentPage from "@/pages/admin/recruitment-page";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootPage />,
    children: [
      { index: true, element: <Navigate to={"/home"} /> },
      { path: "home", element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "dashboard", element: <div>a</div> }],
      },
    ],
  },
  {
    path: "admin",
    element: <AdminPage />,
    children: [
      { index: true, element: <Navigate to={"/admin/dashboard"} /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "company", element: <CompanyPage /> },
      {
        path: "recruitment",
        element: <RecruitmentPage />,
        children: [
          {
            index: true,
            element: <Navigate to={"/admin/recruitment/job-manager"} />,
          },
          { path: "skill-manager", element: <SkillManagerPage /> },
          { path: "job-manager", element: <JobManagerPanel /> },
          {
            path: "/admin/recruitment/job-manager/upsert",
            element: <JobUpsertPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
