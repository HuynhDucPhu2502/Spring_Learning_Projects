// React router
import { createBrowserRouter, Navigate } from "react-router-dom";

// CLIENT PAGE
import RootPage from "@/pages/client";
import AuthPage from "@/pages/client/auth-page";
import HomePage from "@/pages/client/home-page";
import CompanyClientPage from "@/pages/client/company-page";
import CompanyDetailsClientPage from "@/pages/client/company-page/details";
import JobClientPage from "@/pages/client/job-page";
import JobDetailsClientPage from "@/pages/client/job-page/details";

// ADMIN PAGE
import AdminPage from "@/pages/admin";
import CompanyPage from "@/pages/admin/company-page";
import DashboardPage from "@/pages/admin/dashboard-page";
import RecruitmentPage from "@/pages/admin/recruitment-page";
import JobManagerPage from "@/pages/admin/recruitment-page/job-manager-page";
import JobUpsertPage from "@/pages/admin/recruitment-page/job-manager-page/job-upsert-page";
import SkillManagerPage from "@/pages/admin/recruitment-page/skill-manager-page";

// Components
import ErrorPage from "@/components/custom/ErrorPage";
import UserPage from "@/pages/user";
import UserInfoPage from "@/pages/user/user-info-page";
import UserResumePage from "@/pages/user/user-resume-page";

const router = createBrowserRouter([
  // =========================
  // CLIENT ROUTE GROUP
  // =========================
  {
    path: "",
    element: <RootPage />,
    children: [
      { index: true, element: <Navigate to={"/home"} /> },
      { path: "home", element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "companies", element: <CompanyClientPage /> },
      { path: "companies/:id", element: <CompanyDetailsClientPage /> },
      { path: "jobs", element: <JobClientPage /> },
      { path: "jobs/:id", element: <JobDetailsClientPage /> },
      {
        path: "user",
        element: <UserPage />,
        children: [
          {
            index: true,
            element: <Navigate to={"info"} />,
          },
          { path: "info", element: <UserInfoPage /> },
          { path: "resume", element: <UserResumePage /> },
        ],
      },
    ],
  },

  // =========================
  // ADMIN ROUTE GROUP
  // =========================
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
          { path: "job-manager", element: <JobManagerPage /> },
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
