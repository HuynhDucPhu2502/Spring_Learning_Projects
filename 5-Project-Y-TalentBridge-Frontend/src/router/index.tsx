// React router
import { createBrowserRouter, Navigate } from "react-router-dom";

// CLIENT PAGE
import RootPage from "@/pages/client";
import AuthPage from "@/pages/client/auth-page";
import CompanyDetails from "@/pages/client/company-page/details";
import CompaniesClientPage from "@/pages/client/company-page";
import HomePage from "@/pages/client/home-page";
import ProtectedRoute from "@/pages/client/ProtectedRoute ";

// ADMIN PAGE
import AdminPage from "@/pages/admin";
import CompanyPage from "@/pages/admin/company-page";
import DashboardPage from "@/pages/admin/dashboard-page";
import RecruitmentPage from "@/pages/admin/recruitment-page";
import { JobManagerPanel } from "@/pages/admin/recruitment-page/job-manager-page";
import JobUpsertPage from "@/pages/admin/recruitment-page/job-manager-page/job-upsert-page";
import { SkillManagerPage } from "@/pages/admin/recruitment-page/skill-manager-page";

// Components
import ErrorPage from "@/components/custom/ErrorPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootPage />,
    children: [
      { index: true, element: <Navigate to={"/home"} /> },
      { path: "home", element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "companies", element: <CompaniesClientPage /> },
      { path: "companies/:id", element: <CompanyDetails /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "dashboard", element: <div>a</div> }],
      },
    ],
  },
  {
    path: "admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
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

      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
