import AuthPage from "@/pages/client/auth-page";
import HomePage from "@/pages/client/home-page";
import ProtectedRoute from "@/pages/client/ProtectedRoute ";
import RootPage from "@/pages/client";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminPage from "@/pages/admin";
import CompanyPage from "@/pages/admin/company-page";
import DashboardPage from "@/pages/admin/dashboard-page";
import JobSkillPage from "@/pages/admin/job-skill-page";
import { SkillManagerPage } from "@/pages/admin/job-skill-page/skill-manager-page";
import { JobManagerPanel } from "@/pages/admin/job-skill-page/job-manager-page";

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
        path: "job-skill",
        element: <JobSkillPage />,
        children: [
          {
            index: true,
            element: <Navigate to={"/admin/job-skill/skill-manager"} />,
          },
          { path: "skill-manager", element: <SkillManagerPage /> },
          { path: "job-manager", element: <JobManagerPanel /> },
        ],
      },
    ],
  },
]);

export default router;
